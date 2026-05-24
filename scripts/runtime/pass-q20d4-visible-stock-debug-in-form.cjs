const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "src",
  "components",
  "erp",
  "forms",
  "enterprise",
  "ERPEnterpriseForm.tsx"
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

backup(target, "q20d4-visible-stock-debug");

let content = read(target);

if (content.includes("Q20D4_VISIBLE_STOCK_DEBUG")) {
  console.log("[SKIP] Q20D4 déjà appliqué.");
  process.exit(0);
}

const marker = `          if (stockResult.processed) {
            console.info(
              "[Q20D3_STOCK_PROCESSED_AFTER_LINE_SAVE]",
              stockResult
            );
          } else if (
            stockResult.reason &&
            stockResult.reason !== "not-piece-line" &&
            stockResult.reason !== "line-not-validated" &&
            stockResult.reason !== "already-processed"
          ) {
            console.warn(
              "[Q20D3_STOCK_SKIPPED_AFTER_LINE_SAVE]",
              stockResult
            );
          }`;

if (!content.includes(marker)) {
  throw new Error("Bloc Q20D3 stockResult introuvable. Vérifie si Q20D3 est bien appliqué.");
}

const replacement = `          // Q20D4_VISIBLE_STOCK_DEBUG
          // Debug temporaire : afficher clairement pourquoi le stock ne bouge pas.
          if (stockResult.processed) {
            console.info(
              "[Q20D3_STOCK_PROCESSED_AFTER_LINE_SAVE]",
              stockResult
            );
          } else {
            const debugPayload = {
              reason: stockResult.reason,
              line: {
                id: String(savedRecord?.id ?? savedRecord?._id ?? initialData.id ?? initialData._id ?? ""),
                typeLigne:
                  preparedPayload.typeLigne ??
                  savedRecord?.typeLigne ??
                  formValues.typeLigne,
                typeArticle:
                  preparedPayload.typeArticle ??
                  savedRecord?.typeArticle ??
                  formValues.typeArticle,
                statut:
                  preparedPayload.statut ??
                  savedRecord?.statut ??
                  formValues.statut,
                produitId:
                  preparedPayload.produitId ??
                  savedRecord?.produitId ??
                  formValues.produitId,
                stockId:
                  preparedPayload.stockId ??
                  savedRecord?.stockId ??
                  formValues.stockId,
                quantite:
                  preparedPayload.quantite ??
                  savedRecord?.quantite ??
                  formValues.quantite,
                stockMovementId:
                  preparedPayload.stockMovementId ??
                  savedRecord?.stockMovementId ??
                  formValues.stockMovementId,
              },
            };

            console.warn(
              "[Q20D4_STOCK_DEBUG_VISIBLE]",
              debugPayload
            );

            throw new Error(
              "DEBUG STOCK — raison: " +
                String(stockResult.reason ?? "unknown") +
                " | typeLigne=" +
                String(debugPayload.line.typeLigne ?? "") +
                " | typeArticle=" +
                String(debugPayload.line.typeArticle ?? "") +
                " | statut=" +
                String(debugPayload.line.statut ?? "") +
                " | produitId=" +
                String(debugPayload.line.produitId ?? "") +
                " | stockId=" +
                String(debugPayload.line.stockId ?? "") +
                " | quantite=" +
                String(debugPayload.line.quantite ?? "") +
                " | stockMovementId=" +
                String(debugPayload.line.stockMovementId ?? "")
            );
          }`;

content = content.replace(marker, replacement);

write(target, content);

console.log("");
console.log("[Q20D4_DONE] Debug stock visible installé dans ERPEnterpriseForm.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  tester /lignesinterventionauto/<id>/edit");
console.log("  lire le message DEBUG STOCK affiché dans le formulaire");