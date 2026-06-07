const fs = require("fs");
const path = require("path");

const root = process.cwd();
const filePath = "src/components/erp/runtime/ERPRelatedRecordsPanel.tsx";
const fullPath = path.join(root, filePath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", filePath);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2op-b9b-mojibake`;
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let content = fs.readFileSync(fullPath, "utf8");

const replacements = new Map([
  ["confirmées", "confirmées"],
  ["Validée", "Validée"],
  ["Retirée", "Retirée"],
  ["Immobilisé", "Immobilisé"],
  ["Archivé", "Archivé"],
  ["Facturée", "Facturée"],
  ["Annulée", "Annulée"],
  ["Pièce", "Pièce"],
  ["Main d'Å“uvre", "Main d’œuvre"],
  ["Main d'œuvre", "Main d’œuvre"],
  ["Enregistrement lié", "Enregistrement lié"],
  ["Transport générique", "Transport générique"],
  ["création", "création"],
  ["retirées", "retirées"],
  ["affichées", "affichées"],
  ["validées", "validées"],
  ["Ancien â†’ récent", "Ancien → récent"],
  ["Récent â†’ ancien", "Récent → ancien"],
  ["lié", "lié"],
  ["liés", "liés"],
]);

for (const [bad, good] of replacements.entries()) {
  content = content.split(bad).join(good);
}

const mojibakePatterns = ["Ã", "Â", "'", """, "Å“"];

const stillFound = mojibakePatterns.filter((pattern) => content.includes(pattern));

if (stillFound.length > 0) {
  console.error("[MOJIBAKE_REMAINING]", stillFound.join(", "));
  console.error("Inspect:", filePath);
  process.exit(1);
}

fs.writeFileSync(fullPath, content, "utf8");

console.log("[WRITTEN]", filePath);
console.log("[Q2-OP-B9-B] ERPRelatedRecordsPanel mojibake fixed.");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");