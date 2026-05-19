const fs = require("fs");
const path = require("path");

const root = process.cwd();
const target = path.join(
  root,
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx"
);

if (!fs.existsSync(target)) {
  console.error("Missing:", target);
  process.exit(1);
}

let content = fs.readFileSync(target, "utf8");

/**
 * PASS 2N-Q11D FIX
 * Synchroniser les coûts intervention après sauvegarde
 * d'une ligne intervention.
 *
 * Scope strict :
 * - ERPEnterpriseForm uniquement
 * - pas de cockpit
 * - pas de sidebar
 * - pas de stock auto
 * - pas de facture détaillée
 */

if (!content.includes("async function syncInterventionTotalsFromLines(")) {
  const helper = `async function syncInterventionTotalsFromLines(
  interventionId: string
) {
  if (!interventionId) {
    return;
  }

  try {
    const { allERPModules } =
      await import("@/runtime/modules/definitions/coreModules");

    const linesModule =
      allERPModules.find(
        (item) => item.metadata.key === "lignesinterventionauto"
      );

    const interventionModule =
      allERPModules.find(
        (item) => item.metadata.key === "interventionsauto"
      );

    if (!linesModule || !interventionModule) {
      return;
    }

    const lines =
      await RuntimeDataBinding.list(linesModule);

    const relatedLines =
      lines.filter(
        (line) =>
          String(line.interventionId ?? "") === interventionId &&
          String(line.statut ?? "") !== "annulee"
      );

    const totals =
      relatedLines.reduce(
        (acc, line) => {
          const quantity = Number(line.quantite ?? 0);
          const unitPrice = Number(line.prixUnitaire ?? 0);

          const amount =
            Number(line.montantTotal ?? quantity * unitPrice) || 0;

          const type =
            String(line.typeLigne ?? "piece");

          if (type === "piece") {
            acc.pieces += amount;
          } else if (
            type === "main_oeuvre" ||
            type === "service"
          ) {
            acc.mainOeuvre += amount;
          } else if (type === "remise") {
            acc.remises += amount;
          } else {
            acc.autres += amount;
          }

          return acc;
        },
        {
          pieces: 0,
          mainOeuvre: 0,
          remises: 0,
          autres: 0,
        }
      );

    const coutTotal =
      totals.pieces +
      totals.mainOeuvre +
      totals.autres -
      totals.remises;

    await RuntimeDataBinding.update(
      interventionModule,
      interventionId,
      {
        coutPieces: totals.pieces,
        coutMainOeuvre: totals.mainOeuvre + totals.autres,
        coutTotal,
      }
    );
  } catch (error) {
    console.error(
      "[AMARKHYS_SYNC_INTERVENTION_TOTALS_ERROR]",
      error
    );
  }
}

`;

  const marker = "function getInvoiceAmountSummary(";

  if (!content.includes(marker)) {
    console.error("Cannot find getInvoiceAmountSummary marker.");
    process.exit(1);
  }

  content = content.replace(marker, helper + marker);
}

if (!content.includes("AMARKHYS_SYNC_INTERVENTION_TOTALS_AFTER_SAVE")) {
  const marker = `      if (workflowAction && savedRecord) {`;

  if (!content.includes(marker)) {
    console.error("Cannot find workflowAction marker.");
    process.exit(1);
  }

  const syncBlock = `      // AMARKHYS_SYNC_INTERVENTION_TOTALS_AFTER_SAVE
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
      }

`;

  content = content.replace(marker, syncBlock + marker);
}

fs.writeFileSync(target, content, "utf8");

console.log("PASS 2N-Q11D FIX OK: intervention totals sync installed.");