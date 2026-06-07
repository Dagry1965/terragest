const fs = require("fs");
const path = require("path");

const root = process.cwd();
const target = path.join(
  root,
  "src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts"
);

let content = fs.readFileSync(target, "utf8");

const replacements = [
  ["à", "à"],
  ["é", "é"],
  ["è", "è"],
  ["ê", "ê"],
  ["É", "É"],
  ["À", "À"],
  ["ô", "ô"],
  ["û", "û"],
  ["ç", "ç"],
  ["'", "’"],
  [""", "“"],
  [""", "”"],
  [""“", "–"],
  [""”", "—"],
  ["d'", "d’"],
  ["l'", "l’"],
  ["aujourd'hui", "aujourd’hui"],
];

for (const [bad, good] of replacements) {
  content = content.replaceAll(bad, good);
}

fs.writeFileSync(target, content, "utf8");

console.log("OK: AMARKHYS dashboard config mojibake fixed.");