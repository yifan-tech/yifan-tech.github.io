const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { assignWordRoots } = require("./word-root-utils");

const vocabularyPath = path.resolve(__dirname, "../wordverse/vocabulary.js");
const wordrootPath = process.argv[2];
const lemmaPath = process.argv[3];
const context = { window: {} };

vm.runInNewContext(fs.readFileSync(vocabularyPath, "utf8"), context);
const vocabulary = context.window.WORDVERSE_VOCABULARY;
const roots = assignWordRoots(vocabulary.map((item) => item[0]), { wordrootPath, lemmaPath });
const enriched = vocabulary.map((item, index) => [...item.slice(0, 4), roots[index]]);

const output = `/* Generated from ECDICT (MIT): https://github.com/skywind3000/ECDICT */\nwindow.WORDVERSE_VOCABULARY = ${JSON.stringify(enriched)};\n`;
fs.writeFileSync(vocabularyPath, output, "utf8");

console.log(`Enriched ${enriched.length} words with root families`);
