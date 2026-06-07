const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/components/erp/runtime/ERPRuntimePage.tsx",
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
];

const replacements = [
  // Double/triple mojibake frequent
  ["é", "é"],
  ["è", "è"],
  ["ê", "ê"],
  ["à", "à"],
  ["â", "â"],
  ["ô", "ô"],
  ["ç", "ç"],
  ["û", "û"],
  ["ù", "ù"],
  ["ÃƒÆ’Ã‚Â®", "î"],
  ["ÃƒÆ’Ã‚Â¯", "ï"],
  ["É", "É"],
  ["ÃƒÆ’Ã‚Â€", "À"],
  ["ÃƒÆ’Ã‚Â‡", "Ç"],

  // Common UTF-8 read as Windows-1252
  ["é", "é"],
  ["è", "è"],
  ["ê", "ê"],
  ["à", "à"],
  ["â", "â"],
  ["ô", "ô"],
  ["ç", "ç"],
  ["û", "û"],
  ["ù", "ù"],
  ["Ã®", "î"],
  ["Ã¯", "ï"],
  ["É", "É"],
  ["À", "À"],
  ["Ç", "Ç"],

  // Apostrophes / dashes / spaces
  ["'", "'"],
  ["'", "'"],
  [""", '"'],
  [""", '"'],
  [""”", "—"],
  [""“", "–"],
  [" ", " "],
  ["Â", ""],

  // Specific recurring broken fragments seen in current files
  ["lââ"šÂ¬â"žÂ¢historique", "l'historique"],
  ["dââ"šÂ¬â"žÂ¢intervention", "d'intervention"],
  ["l"â„¢historique", "l'historique"],
  ["d"â„¢intervention", "d'intervention"],
];

function fullPath(relPath) {
  return path.join(ROOT, relPath);
}

function backup(relPath) {
  const source = fullPath(relPath);
  const target = fullPath(`${relPath}.bak-q20h6a0-fix-runtime-ui-encoding`);

  if (!fs.existsSync(target)) {
    fs.copyFileSync(source, target);
    console.log(`[BACKUP] ${relPath}.bak-q20h6a0-fix-runtime-ui-encoding`);
  } else {
    console.log(`[BACKUP EXISTS] ${relPath}.bak-q20h6a0-fix-runtime-ui-encoding`);
  }
}

function fixContent(content) {
  let next = content;

  for (const [bad, good] of replacements) {
    next = next.split(bad).join(good);
  }

  return next;
}

let changedCount = 0;

for (const relPath of files) {
  const filePath = fullPath(relPath);

  if (!fs.existsSync(filePath)) {
    console.log(`[SKIP] Missing: ${relPath}`);
    continue;
  }

  backup(relPath);

  const before = fs.readFileSync(filePath, "utf8");
  const after = fixContent(before);

  if (after !== before) {
    fs.writeFileSync(filePath, after, "utf8");
    console.log(`[FIXED] ${relPath}`);
    changedCount += 1;
  } else {
    console.log(`[UNCHANGED] ${relPath}`);
  }
}

console.log("");
console.log(`[Q20H6A0_DONE] Encoding cleanup completed. Files changed: ${changedCount}`);
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  inspect remaining mojibake");
console.log("  test UI");