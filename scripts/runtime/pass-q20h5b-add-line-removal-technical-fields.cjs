const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated",
  "lignesinterventionauto",
  "lignesinterventionauto.module.ts"
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

backup(target, "q20h5b-line-removal-technical-fields");

let content = read(target);

if (content.includes('key: "removedAt"')) {
  console.log("[SKIP] Champs techniques de retrait déjà présents.");
  process.exit(0);
}


const insertionAnchor = `      {
        key: "observations",
        label: "Observations",
        type: "textarea",
        grid: { cols: 12 },
      },`;

if (!content.includes(insertionAnchor)) {
  throw new Error("Champ observations introuvable. Inspection manuelle nécessaire.");
}

const technicalFields = `      {
        key: "removedAt",
        label: "Retirée le",
        type: "datetime",
        readonly: true,
        hidden: true,
      },
      {
        key: "removedBy",
        label: "Retirée par",
        type: "text",
        readonly: true,
        hidden: true,
      },
      {
        key: "removedReason",
        label: "Motif du retrait",
        type: "textarea",
        readonly: true,
        hidden: true,
      },
      {
        key: "removedFromStatus",
        label: "Statut avant retrait",
        type: "text",
        readonly: true,
        hidden: true,
      },
      {
        key: "stockReversalMovementId",
        label: "Mouvement inverse stock",
        type: "text",
        readonly: true,
        hidden: true,
      },
`;

content = content.replace(
  insertionAnchor,
  technicalFields + insertionAnchor
);

const technicalKeys = [
  "removedAt",
  "removedBy",
  "removedReason",
  "removedFromStatus",
  "stockReversalMovementId",
];

content = content.replace(
  `"stockProcessedQuantity",`,
  `"stockProcessedQuantity",
${technicalKeys.map((key) => `"${key}",`).join("\n")}`
);


console.log("");
console.log("[Q20H5B_DONE] Champs techniques de retrait ajoutés à lignesinterventionauto.");
console.log("");
console.log("Next:");
console.log("  pnpm build");