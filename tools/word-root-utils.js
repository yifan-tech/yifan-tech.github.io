const fs = require("fs");

const prefixes = [
  "counter", "under", "super", "inter", "trans", "over", "post", "anti",
  "auto", "pre", "non", "mis", "sub", "dis", "un", "re", "im", "in", "ir", "il",
];

const suffixRules = [
  ["ability", "able"],
  ["ibility", "ible"],
  ["ational", "ate"],
  ["ization", "ize"],
  ["isation", "ise"],
  ["ation", ""],
  ["ition", ""],
  ["tion", ""],
  ["sion", ""],
  ["ness", ""],
  ["less", ""],
  ["ment", ""],
  ["fully", ""],
  ["ful", ""],
  ["ously", ""],
  ["ous", ""],
  ["ively", "e"],
  ["ive", "e"],
  ["ality", "al"],
  ["ity", ""],
  ["able", ""],
  ["ible", ""],
  ["ally", "al"],
  ["ly", ""],
  ["ism", ""],
  ["ist", ""],
  ["ship", ""],
  ["hood", ""],
  ["ence", ""],
  ["ance", ""],
  ["al", ""],
  ["er", ""],
  ["or", ""],
];

function loadEtymologyRoots(filePath) {
  if (!filePath) return new Map();
  const source = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const roots = new Map();

  for (const [key, data] of Object.entries(source)) {
    if (data.class !== "root") continue;
    const label = String(data.root || key).replace(/\s+/g, " ").trim();
    for (const example of data.example || []) {
      const word = String(example).toLowerCase();
      if (/^[a-z-]+$/.test(word) && !roots.has(word)) roots.set(word, label);
    }
  }

  return roots;
}

function loadLemmas(filePath) {
  const lemmas = new Map();
  if (!filePath) return lemmas;

  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    if (!line || line.startsWith(";") || !line.includes(" -> ")) continue;
    const [head, variants] = line.split(" -> ");
    const lemma = head.split("/")[0].toLowerCase();
    for (const variant of variants.split(",")) {
      const word = variant.trim().toLowerCase();
      if (/^[a-z-]+$/.test(word) && !lemmas.has(word)) lemmas.set(word, lemma);
    }
  }

  return lemmas;
}

function morphologicalCandidates(word) {
  const candidates = new Set();

  for (const prefix of prefixes) {
    if (word.startsWith(prefix) && word.length - prefix.length >= 4) {
      candidates.add(word.slice(prefix.length));
    }
  }

  for (const [suffix, replacement] of suffixRules) {
    if (word.endsWith(suffix) && word.length - suffix.length >= 3) {
      candidates.add(word.slice(0, -suffix.length) + replacement);
    }
  }

  if (word.endsWith("ies") && word.length > 4) candidates.add(`${word.slice(0, -3)}y`);
  if (word.endsWith("ied") && word.length > 4) candidates.add(`${word.slice(0, -3)}y`);
  if (word.endsWith("ing") && word.length > 5) {
    candidates.add(word.slice(0, -3));
    candidates.add(`${word.slice(0, -3)}e`);
    candidates.add(word.slice(0, -4));
  }
  if (word.endsWith("ed") && word.length > 4) {
    candidates.add(word.slice(0, -2));
    candidates.add(`${word.slice(0, -1)}`);
    candidates.add(word.slice(0, -3));
  }
  if (word.endsWith("es") && word.length > 4) {
    candidates.add(word.slice(0, -2));
    candidates.add(word.slice(0, -1));
  }
  if (word.endsWith("s") && word.length > 3 && !word.endsWith("ss")) {
    candidates.add(word.slice(0, -1));
  }

  return [...candidates].filter((candidate) => candidate.length >= 3);
}

function assignWordRoots(words, options = {}) {
  const wordSet = new Set(words);
  const etymology = loadEtymologyRoots(options.wordrootPath);
  const lemmas = loadLemmas(options.lemmaPath);
  const roots = new Map();

  for (const word of words) {
    if (etymology.has(word)) roots.set(word, etymology.get(word));
  }

  for (let pass = 0; pass < 4; pass += 1) {
    for (const word of words) {
      if (roots.has(word)) continue;
      const lemma = lemmas.get(word);
      const candidates = [
        ...(lemma && wordSet.has(lemma) ? [lemma] : []),
        ...morphologicalCandidates(word).filter((candidate) => wordSet.has(candidate)),
      ].sort((left, right) => right.length - left.length);

      const base = candidates[0];
      if (!base) continue;
      roots.set(word, roots.get(base) || etymology.get(base) || base);
    }
  }

  return words.map((word) => roots.get(word) || word);
}

module.exports = { assignWordRoots };
