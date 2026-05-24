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

backup(target, "q20d2-debug-stock-processing");

let content = read(target);

if (content.includes("[Q20D2_STOCK_DEBUG_RECORD]")) {
  console.log("[SKIP] Debug déjà présent.");
  process.exit(0);
}

const marker = `    const result =
      await RuntimeStockMovementService.processInterventionLineStock({
        line: record,
      });`;

if (!content.includes(marker)) {
  throw new Error("Bloc processInterventionLineStock introuvable.");
}

const replacement = `    console.info("[Q20D2_STOCK_DEBUG_RECORD]", {
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

    const result =
      await RuntimeStockMovementService.processInterventionLineStock({
        line: record,
      });

    console.info("[Q20D2_STOCK_DEBUG_RESULT]", result);`;

content = content.replace(marker, replacement);

write(target, content);

console.log("");
console.log("[Q20D2_DEBUG_INSTALLED]");
console.log("Next:");
console.log("  pnpm build");
console.log("  relancer pnpm dev si nécessaire");
console.log("  sauvegarder la ligne intervention");
console.log("  lire les logs Q20D2_STOCK_DEBUG_RECORD / Q20D2_STOCK_DEBUG_RESULT");