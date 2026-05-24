const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "src",
  "runtime",
  "firestore",
  "FirestoreRuntimeMutation.ts"
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

backup(target, "q20d5b-remove-stock-debug-logs");

let content = read(target);

content = content.replace(
`  console.info("[Q20D2_POST_MUTATION_ENTRY]", {
    moduleKey: module.metadata.key,
    id: String(record.id ?? record._id ?? ""),
    statut: record.statut,
    typeLigne: record.typeLigne,
    typeArticle: record.typeArticle,
    produitId: record.produitId,
    stockId: record.stockId,
    quantite: record.quantite,
  });
`,
""
);

content = content.replace(
`    console.info("[Q20D2_STOCK_DEBUG_RECORD]", {
      id: String(record.id ?? record._id ?? ""),
      interventionId: record.interventionId,
      produitId: record.produitId,
      stockId: record.stockId,
      typeLigne: record.typeLigne,
      typeArticle: record.typeArticle,
      statut: record.statut,
      quantite: record.quantite,
      stockMovementId: record.stockMovementId,
    });

`,
""
);

content = content.replace(
`
    console.info("[Q20D2_STOCK_DEBUG_RESULT]", result);`,
""
);

write(target, content);

console.log("");
console.log("[Q20D5B_DONE] Logs debug Q20D2 supprimés.");
console.log("");
console.log("Next:");
console.log("  pnpm build");