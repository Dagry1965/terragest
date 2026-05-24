const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const suffix = "q21c-process-stock-reception-movement";

const stockServiceRel = "src/runtime/stock/RuntimeStockMovementService.ts";
const mutationRel = "src/runtime/firestore/FirestoreRuntimeMutation.ts";

function full(rel) {
  return path.join(ROOT, rel);
}

function backup(rel) {
  const src = full(rel);
  const bak = full(`${rel}.bak-${suffix}`);

  if (!fs.existsSync(src)) {
    console.error(`[ERROR] Missing ${rel}`);
    process.exit(1);
  }

  if (!fs.existsSync(bak)) {
    fs.copyFileSync(src, bak);
    console.log(`[BACKUP] ${rel}.bak-${suffix}`);
  }
}

function read(rel) {
  return fs.readFileSync(full(rel), "utf8");
}

function write(rel, content) {
  fs.writeFileSync(full(rel), content, "utf8");
  console.log(`[WRITTEN] ${rel}`);
}

backup(stockServiceRel);
backup(mutationRel);

let stockService = read(stockServiceRel);

// 1) Extend params interface.
if (!stockService.includes("interface ProcessStockReceptionParams")) {
  stockService = stockService.replace(
    `interface ProcessInterventionLineStockParams {
  line: RuntimeRecord;
}

interface StockProcessResult {`,
    `interface ProcessInterventionLineStockParams {
  line: RuntimeRecord;
}

interface ProcessStockReceptionParams {
  reception: RuntimeRecord;
}

interface StockProcessResult {`
  );
}

// 2) Add helpers.
if (!stockService.includes("function isValidatedReception(")) {
  stockService = stockService.replace(
    `function alreadyProcessed(line: RuntimeRecord): boolean {
  return Boolean(line.stockMovementId);
}

async function findStockRecord(`,
    `function alreadyProcessed(line: RuntimeRecord): boolean {
  return Boolean(line.stockMovementId);
}

function isValidatedReception(reception: RuntimeRecord): boolean {
  return String(reception.statut ?? "") === "validee";
}

function receptionAlreadyProcessed(reception: RuntimeRecord): boolean {
  return Boolean(reception.mouvementStockId);
}

function computeStockStatus(quantity: number, stock: RuntimeRecord): string {
  const alertThreshold = getNumber(stock.seuilAlerte);

  if (quantity <= 0) return "rupture";
  if (alertThreshold > 0 && quantity <= alertThreshold) {
    return "stock_faible";
  }

  return "disponible";
}

async function findStockRecord(`
  );
}

// 3) Normalize existing stock status block to use helper if desired.
stockService = stockService.replace(
  /statut:\s*\n\s*stockQuantityAfter <= 0\s*\n\s*\? "rupture"\s*\n\s*:\s*stock\.seuilAlerte &&\s*\n\s*stockQuantityAfter <= getNumber\(stock\.seuilAlerte\)\s*\n\s*\? "stock_faible"\s*\n\s*:\s*"disponible",/,
  `statut: computeStockStatus(stockQuantityAfter, stock),`
);

// 4) Add processStockReception before closing export object.
if (!stockService.includes("async processStockReception(")) {
  stockService = stockService.replace(
    `    return {
      processed: true,
      movementId,
    };
  },
};`,
    `    return {
      processed: true,
      movementId,
    };
  },

  async processStockReception({
    reception,
  }: ProcessStockReceptionParams): Promise<StockProcessResult> {
    const receptionId = getRecordId(reception);

    if (!receptionId) {
      return {
        processed: false,
        reason: "missing-reception-id",
      };
    }

    if (!isValidatedReception(reception)) {
      return {
        processed: false,
        reason: "reception-not-validated",
      };
    }

    if (receptionAlreadyProcessed(reception)) {
      return {
        processed: false,
        reason: "already-processed",
        movementId: String(reception.mouvementStockId),
      };
    }

    const stockId = String(reception.stockId ?? "");
    const produitId = String(reception.produitId ?? "");
    const commandeId = String(reception.commandeId ?? "");
    const ligneCommandeId = String(reception.ligneCommandeId ?? "");
    const quantity = getNumber(reception.quantiteRecue);

    if (!stockId || !produitId || quantity <= 0) {
      return {
        processed: false,
        reason: "missing-stock-product-or-quantity",
      };
    }

    const stockModule = getModule("stocksauto");
    const movementModule = getModule("mouvementsstockauto");
    const receptionModule = getModule("receptionsstockauto");

    if (!stockModule || !movementModule || !receptionModule) {
      return {
        processed: false,
        reason: "required-module-missing",
      };
    }

    const stock = await findStockRecord(stockModule, stockId);

    if (!stock) {
      return {
        processed: false,
        reason: "stock-not-found",
      };
    }

    const stockQuantityBefore = getNumber(stock.quantite);
    const stockQuantityAfter = stockQuantityBefore + quantity;

    const movement = await RuntimeDataBinding.create(movementModule, {
      typeMouvement: "entree",
      stockId,
      produitId,
      quantite: quantity,
      quantiteAvant: stockQuantityBefore,
      quantiteApres: stockQuantityAfter,
      sourceModule: "receptionsstockauto",
      sourceId: receptionId,
      commandeId,
      ligneCommandeId,
      receptionId,
      motif: "Entree automatique liee a une reception stock validee",
      statut: "valide",
      dateMouvement: todayIsoDate(),
      createdAt: nowIso(),
    });

    const movementId = getRecordId(movement);

    await RuntimeDataBinding.update(stockModule, stockId, {
      ...stock,
      quantite: stockQuantityAfter,
      statut: computeStockStatus(stockQuantityAfter, stock),
      updatedAt: nowIso(),
    });

    await RuntimeDataBinding.update(receptionModule, receptionId, {
      ...reception,
      mouvementStockId: movementId,
      stockProcessedAt: todayIsoDate(),
      stockProcessedQuantity: quantity,
      updatedAt: nowIso(),
    });

    return {
      processed: true,
      movementId,
    };
  },
};`
  );
}

write(stockServiceRel, stockService);

// -----------------------------------------------------------------------------
// FirestoreRuntimeMutation.ts
// -----------------------------------------------------------------------------

let mutation = read(mutationRel);

// 5) Allow receptionsstockauto side-effects.
mutation = mutation.replace(
  `  if (module.metadata.key !== "lignesinterventionauto") {
    return;
  }`,
  `  if (
    module.metadata.key !== "lignesinterventionauto" &&
    module.metadata.key !== "receptionsstockauto"
  ) {
    return;
  }`
);

// 6) Keep intervention totals only for lines.
mutation = mutation.replace(
  `  try {
    const { RuntimeInterventionTotalsService } =
      await import("@/runtime/interventions");

    const interventionId =
      String(record.interventionId ?? "").trim();

    if (interventionId) {
      await RuntimeInterventionTotalsService.syncInterventionTotals({
        interventionId,
      });
    }
  } catch (error) {
    console.error(
      "[RUNTIME_INTERVENTION_TOTALS_SYNC_ERROR]",
      error
    );
  }`,
  `  if (module.metadata.key === "lignesinterventionauto") {
    try {
      const { RuntimeInterventionTotalsService } =
        await import("@/runtime/interventions");

      const interventionId =
        String(record.interventionId ?? "").trim();

      if (interventionId) {
        await RuntimeInterventionTotalsService.syncInterventionTotals({
          interventionId,
        });
      }
    } catch (error) {
      console.error(
        "[RUNTIME_INTERVENTION_TOTALS_SYNC_ERROR]",
        error
      );
    }
  }`
);

// 7) Dispatch stock side-effect by module.
mutation = mutation.replace(
  `    const result =
      await RuntimeStockMovementService.processInterventionLineStock({
        line: record,
      });`,
  `    const result =
      module.metadata.key === "receptionsstockauto"
        ? await RuntimeStockMovementService.processStockReception({
            reception: record,
          })
        : await RuntimeStockMovementService.processInterventionLineStock({
            line: record,
          });`
);

// 8) Previous record for update should also apply to receptionsstockauto.
mutation = mutation.replace(
  `      module.metadata.key === "lignesinterventionauto"
        ? await FirestoreRuntimeRepository.findById(`,
  `      module.metadata.key === "lignesinterventionauto" ||
      module.metadata.key === "receptionsstockauto"
        ? await FirestoreRuntimeRepository.findById(`
);

write(mutationRel, mutation);

console.log("");
console.log("[Q21C_DONE] Reception stock movement processing installed.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  Test reception stock: brouillon -> validee");