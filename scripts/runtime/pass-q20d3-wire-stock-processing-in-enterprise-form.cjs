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

backup(target, "q20d3-wire-stock-processing-form");

let content = read(target);

if (content.includes("Q20D3_PROCESS_STOCK_AFTER_LINE_SAVE")) {
  console.log("[SKIP] Q20D3 déjà appliqué.");
  process.exit(0);
}

const marker = `      // AMARKHYS_SYNC_INTERVENTION_TOTALS_AFTER_SAVE
      if (module.metadata.key === "lignesinterventionauto") {
        const interventionId =
          String(
            preparedPayload.interventionId ??
            savedRecord?.interventionId ??
            formValues.interventionId ??
            ""
          );

        if (interventionId) {
          await syncInterventionTotalsFromLines(interventionId);
        }
      }`;

if (!content.includes(marker)) {
  throw new Error("Bloc AMARKHYS_SYNC_INTERVENTION_TOTALS_AFTER_SAVE introuvable.");
}

const replacement = `      // AMARKHYS_SYNC_INTERVENTION_TOTALS_AFTER_SAVE
      if (module.metadata.key === "lignesinterventionauto") {
        const interventionId =
          String(
            preparedPayload.interventionId ??
            savedRecord?.interventionId ??
            formValues.interventionId ??
            ""
          );

        if (interventionId) {
          await syncInterventionTotalsFromLines(interventionId);
        }

        // Q20D3_PROCESS_STOCK_AFTER_LINE_SAVE
        // Le traitement reste porté par le moteur runtime stock.
        // Le formulaire central ne fait qu'orchestrer le post-save fiable des lignes.
        try {
          const { RuntimeStockMovementService } =
            await import("@/runtime/stock");

          const stockResult =
            await RuntimeStockMovementService.processInterventionLineStock({
              line: {
                ...initialData,
                ...preparedPayload,
                ...(savedRecord ?? {}),
              },
            });

          if (stockResult.processed) {
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
          }
        } catch (error) {
          console.error(
            "[Q20D3_STOCK_PROCESSING_AFTER_LINE_SAVE_ERROR]",
            error
          );

          throw error;
        }
      }`;

content = content.replace(marker, replacement);

write(target, content);

console.log("");
console.log("[Q20D3_DONE] Traitement stock branché après sauvegarde ligne dans ERPEnterpriseForm.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  tester une ligne intervention type piece + statut validee + stockId");