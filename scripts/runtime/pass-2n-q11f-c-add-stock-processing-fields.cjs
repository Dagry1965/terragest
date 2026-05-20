const fs = require("fs");
const os = require("os");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated",
  "lignesinterventionauto",
  "lignesinterventionauto.module.ts"
);

if (!fs.existsSync(file)) {
  throw new Error(`Fichier introuvable: ${file}`);
}

const backupDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "terragest-q11f-c-")
);

const backupFile = path.join(
  backupDir,
  "lignesinterventionauto.module.ts.bak"
);

let content = fs.readFileSync(file, "utf8");
fs.writeFileSync(backupFile, content, "utf8");

console.log("BACKUP:", backupFile);

if (content.includes(`key: "stockMovementId"`)) {
  console.log("INFO: champs stock déjà présents.");
  process.exit(0);
}

const stockProcessingFields = `      {
        key: "stockMovementId",
        label: "Mouvement stock",
        type: "relation",
        relation: { module: "mouvementsstockauto" },
        searchable: true,
        grid: { cols: 4 },
      },
      {
        key: "stockProcessedAt",
        label: "Stock traité le",
        type: "date",
        grid: { cols: 4 },
      },
      {
        key: "stockProcessedQuantity",
        label: "Quantité traitée en stock",
        type: "number",
        grid: { cols: 4 },
      },
`;

const marker = `      {
        key: "observations",
        label: "Observations",`;

if (!content.includes(marker)) {
  throw new Error("Marqueur observations introuvable dans lignesinterventionauto.module.ts");
}

content = content.replace(
  marker,
  stockProcessingFields + marker
);

fs.writeFileSync(file, content, "utf8");

console.log("OK: champs de traitement stock ajoutés à lignesinterventionauto.");