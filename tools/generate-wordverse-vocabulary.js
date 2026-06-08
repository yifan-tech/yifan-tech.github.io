const fs = require("fs");
const path = require("path");
const { assignWordRoots } = require("./word-root-utils");

const sourcePath = process.argv[2];
const wordrootPath = process.argv[3];
const lemmaPath = process.argv[4];
const outputPath = path.resolve(__dirname, "../wordverse/vocabulary.js");

if (!sourcePath) {
  throw new Error(
    "Usage: node tools/generate-wordverse-vocabulary.js <ecdict.csv> [wordroot.txt] [lemma.en.txt]"
  );
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];

    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
    } else if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }

  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

function cleanTranslation(value) {
  const parts = value
    .replace(/\\n/g, "\n")
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("[网络]") && !line.startsWith("网络释义"));

  return parts
    .slice(0, 3)
    .join("；")
    .replace(/\s+/g, " ")
    .replace(/；{2,}/g, "；")
    .slice(0, 220);
}

function normalizePos(value, translation) {
  const values = value
    .split("/")
    .map((item) => item.split(":")[0].trim())
    .filter(Boolean);

  if (values.length) return [...new Set(values)].slice(0, 3).join(" / ");
  const inferred = [...translation.matchAll(/(?:^|\n)(art|aux|conj|pron|prep|num|int|adj|adv|n|v)\./g)]
    .map((match) => `${match[1]}.`);
  return [...new Set(inferred)].slice(0, 3).join(" / ") || "word";
}

function frequency(row) {
  const values = [Number(row.bnc), Number(row.frq)].filter((value) => value > 0);
  return values.length ? Math.min(...values) : Number.MAX_SAFE_INTEGER;
}

function examRank(row) {
  const tags = new Set(row.tag.split(/\s+/).filter(Boolean));
  if (tags.has("gk")) return 0;
  if (tags.has("zk")) return 1;
  if (row.oxford === "1") return 2;
  if (tags.has("cet4")) return 3;
  return 4;
}

const rows = parseCsv(fs.readFileSync(sourcePath, "utf8"));
const headers = rows.shift();
const candidates = rows
  .map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] || ""])))
  .filter((row) => /^[a-z][a-z-]{1,20}$/.test(row.word))
  .map((row) => ({
    word: row.word,
    phonetic: row.phonetic.trim(),
    pos: normalizePos(row.pos, row.translation.replace(/\\n/g, "\n")),
    meaning: cleanTranslation(row.translation),
    rank: examRank(row),
    frequency: frequency(row),
    collins: Number(row.collins) || 0,
  }))
  .filter((row) => /[\u3400-\u9fff]/.test(row.meaning))
  .sort((left, right) =>
    left.rank - right.rank ||
    left.frequency - right.frequency ||
    right.collins - left.collins ||
    left.word.localeCompare(right.word)
  );

const selected = [];
const seen = new Set();

for (const row of candidates) {
  if (seen.has(row.word)) continue;
  seen.add(row.word);
  selected.push([row.word, row.phonetic, row.pos, row.meaning]);
  if (selected.length === 3500) break;
}

if (selected.length !== 3500) {
  throw new Error(`Expected 3500 words, generated ${selected.length}`);
}

const roots = assignWordRoots(selected.map((item) => item[0]), { wordrootPath, lemmaPath });
selected.forEach((item, index) => item.push(roots[index]));

const output = `/* Generated from ECDICT (MIT): https://github.com/skywind3000/ECDICT */\nwindow.WORDVERSE_VOCABULARY = ${JSON.stringify(selected, null, 0)};\n`;
fs.writeFileSync(outputPath, output, "utf8");

console.log(`Generated ${selected.length} words at ${outputPath}`);
