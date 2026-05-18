const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts"
);

let content = fs.readFileSync(target, "utf8");

/**
 * Most strings in this file are UTF-8 text that was previously decoded as Latin-1.
 * Re-encoding the mojibake text as latin1 bytes and decoding as utf8 restores accents.
 */
function fixLine(line) {
  if (!/[Ãâ]/.test(line)) {
    return line;
  }

  return Buffer.from(line, "latin1").toString("utf8");
}

content = content
  .split(/\r?\n/)
  .map(fixLine)
  .join("\n");

/**
 * Safety replacements for remaining common sequences.
 */
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
];

for (const [bad, good] of replacements) {
  content = content.replaceAll(bad, good);
}

fs.writeFileSync(target, content, "utf8");

const after = fs.readFileSync(target, "utf8");
const remaining = after
  .split(/\r?\n/)
  .map((line, index) => ({ line, index: index + 1 }))
  .filter(({ line }) => /[Ãâ]/.test(line));

if (remaining.length > 0) {
  console.error("FAILED: mojibake still found in ERPBusinessAmarkhysDashboardConfig.ts");
  for (const item of remaining.slice(0, 40)) {
    console.error("L" + item.index + ": " + item.line);
  }
  process.exit(1);
}

console.log("OK: ERPBusinessAmarkhysDashboardConfig.ts encoding fixed.");