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

backup(target, "q20h5e-a-show-line-status-panel");

let content = read(target);

if (content.includes("Q20H5E_LINE_PANEL_STATUS_FIELDS")) {
  console.log("[SKIP] Q20H5E-A déjà appliqué.");
  process.exit(0);
}

const anchor = `        lazy: true,
        totalField: "montantTotal",`;

if (!content.includes(anchor)) {
  throw new Error("Bloc child lignesinterventionauto introuvable.");
}

const replacement = `        lazy: true,

        // Q20H5E_LINE_PANEL_STATUS_FIELDS
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
        ],

        totalField: "montantTotal",`;

content = content.replace(anchor, replacement);

write(target, content);

console.log("");
console.log("[Q20H5E_A_DONE] Statut et montant ajoutés à l'affichage des lignes liées.");
console.log("");
console.log("Next:");
console.log("  pnpm build");