const fs = require("fs");
const path = require("path");

const root = process.cwd();
const target = path.join(
  root,
  "src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts"
);

let content = fs.readFileSync(target, "utf8");

const replacements = [
  ["Ã ", "à"],
  ["Ã©", "é"],
  ["Ã¨", "è"],
  ["Ãª", "ê"],
  ["Ã‰", "É"],
  ["Ã€", "À"],
  ["Ã´", "ô"],
  ["Ã»", "û"],
  ["Ã§", "ç"],
  ["â€™", "’"],
  ["â€œ", "“"],
  ["â€", "”"],
  ["â€“", "–"],
  ["â€”", "—"],
  ["dâ€™", "d’"],
  ["lâ€™", "l’"],
  ["aujourdâ€™hui", "aujourd’hui"],
];

for (const [bad, good] of replacements) {
  content = content.replaceAll(bad, good);
}

fs.writeFileSync(target, content, "utf8");

console.log("OK: AMARKHYS dashboard config mojibake fixed.");