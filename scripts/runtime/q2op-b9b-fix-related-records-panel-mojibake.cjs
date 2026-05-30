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
  ["confirmÃ©es", "confirmées"],
  ["ValidÃ©e", "Validée"],
  ["RetirÃ©e", "Retirée"],
  ["ImmobilisÃ©", "Immobilisé"],
  ["ArchivÃ©", "Archivé"],
  ["FacturÃ©e", "Facturée"],
  ["AnnulÃ©e", "Annulée"],
  ["PiÃ¨ce", "Pièce"],
  ["Main dâ€™Å“uvre", "Main d’œuvre"],
  ["Main dâ€™œuvre", "Main d’œuvre"],
  ["Enregistrement liÃ©", "Enregistrement lié"],
  ["Transport gÃ©nÃ©rique", "Transport générique"],
  ["crÃ©ation", "création"],
  ["retirÃ©es", "retirées"],
  ["affichÃ©es", "affichées"],
  ["validÃ©es", "validées"],
  ["Ancien â†’ rÃ©cent", "Ancien → récent"],
  ["RÃ©cent â†’ ancien", "Récent → ancien"],
  ["liÃ©", "lié"],
  ["liÃ©s", "liés"],
]);

for (const [bad, good] of replacements.entries()) {
  content = content.split(bad).join(good);
}

const mojibakePatterns = ["Ã", "Â", "â€™", "â€", "Å“"];

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