const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated",
  "interventionsauto",
  "interventionsauto.module.ts"
);

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function backup(file, suffix) {
  const backupPath = `${file}.bak-${suffix}`;

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(file, backupPath);
    console.log(`[BACKUP] ${path.relative(root, backupPath)}`);
  }
}

if (!fs.existsSync(target)) {
  throw new Error(`Fichier introuvable: ${target}`);
}

backup(target, "q20h5e-b1-clean-line-panel-labels");

let content = read(target);

if (content.includes("Q20H5E_B1_CLEAN_LINE_PANEL_LABELS")) {
  console.log("[SKIP] Q20H5E-B1 déjà appliqué.");
  process.exit(0);
}

const oldBlock = `        // Q20H5E_LINE_PANEL_STATUS_FIELDS
        // Affichage métier des lignes liées dans l'intervention.
        labelFields: [
          "designation",
          "produitNom",
          "typeLigne",
        ],
        subtitleFields: [
          "statut",
          "quantite",
          "montantTotal",
        ],`;

const newBlock = `        // Q20H5E_B1_CLEAN_LINE_PANEL_LABELS
        // Affichage métier lisible des lignes liées :
        // titre non dupliqué + statut/quantité/montant en informations secondaires.
        labelFields: [
          "designation",
        ],
        subtitleFields: [
          "statut",
          "quantite",
          "typeLigne",
          "montantTotal",
          "stockId",
        ],`;

if (!content.includes(oldBlock)) {
  throw new Error("Bloc labelFields/subtitleFields des lignes introuvable.");
}

content = content.replace(oldBlock, newBlock);

write(target, content);

console.log("");
console.log("[Q20H5E_B1_DONE] Libellés lignes intervention nettoyés.");
console.log("");
console.log("Next:");
console.log("  pnpm build");