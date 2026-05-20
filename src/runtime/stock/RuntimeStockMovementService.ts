import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { allERPModules } from "@/runtime/modules/definitions/coreModules";
import type { ERPModule } from "@/runtime/modules/ERPModule";

type RuntimeRecord = Record<string, unknown>;

interface ProcessInterventionLineStockParams {
  line: RuntimeRecord;
}

interface StockProcessResult {
  processed: boolean;
  reason?: string;
  movementId?: string;
}

function getModule(moduleKey: string): ERPModule | undefined {
  return allERPModules.find((module) => module.metadata.key === moduleKey);
}

function getRecordId(record: RuntimeRecord): string {
  return String(record.id ?? record._id ?? "");
}

function getNumber(value: unknown): number {
  const numberValue = Number(value ?? 0);

  return Number.isFinite(numberValue) ? numberValue : 0;
}

function todayIsoDate(): string {
  return new Date().toISOString().split("T")[0];
}

function nowIso(): string {
  return new Date().toISOString();
}

function isPieceLine(line: RuntimeRecord): boolean {
  return String(line.typeLigne ?? "") === "piece";
}

function isValidatedLine(line: RuntimeRecord): boolean {
  return String(line.statut ?? "") === "validee";
}

function alreadyProcessed(line: RuntimeRecord): boolean {
  return Boolean(line.stockMovementId);
}

async function findStockRecord(
  stockModule: ERPModule,
  stockId: string
): Promise<RuntimeRecord | null> {
  const stocks = await RuntimeDataBinding.list(stockModule);

  return (
    stocks.find((stock) => getRecordId(stock) === stockId) ?? null
  );
}

export const RuntimeStockMovementService = {
  async processInterventionLineStock({
    line,
  }: ProcessInterventionLineStockParams): Promise<StockProcessResult> {
    const lineId = getRecordId(line);

    if (!lineId) {
      return {
        processed: false,
        reason: "missing-line-id",
      };
    }

    if (!isPieceLine(line)) {
      return {
        processed: false,
        reason: "not-piece-line",
      };
    }

    if (!isValidatedLine(line)) {
      return {
        processed: false,
        reason: "line-not-validated",
      };
    }

    if (alreadyProcessed(line)) {
      return {
        processed: false,
        reason: "already-processed",
        movementId: String(line.stockMovementId),
      };
    }

    const stockId = String(line.stockId ?? "");
    const produitId = String(line.produitId ?? "");
    const interventionId = String(line.interventionId ?? "");
    const quantity = getNumber(line.quantite);

    if (!stockId || !produitId || quantity <= 0) {
      return {
        processed: false,
        reason: "missing-stock-product-or-quantity",
      };
    }

    const stockModule = getModule("stocksauto");
    const movementModule = getModule("mouvementsstockauto");
    const lineModule = getModule("lignesinterventionauto");

    if (!stockModule || !movementModule || !lineModule) {
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
    const stockQuantityAfter = stockQuantityBefore - quantity;

    if (stockQuantityAfter < 0) {
      return {
        processed: false,
        reason: "insufficient-stock",
      };
    }

    const movement = await RuntimeDataBinding.create(movementModule, {
      typeMouvement: "sortie",
      stockId,
      produitId,
      quantite: quantity,
      quantiteAvant: stockQuantityBefore,
      quantiteApres: stockQuantityAfter,
      sourceModule: "lignesinterventionauto",
      sourceId: lineId,
      interventionId,
      ligneInterventionId: lineId,
      motif: "Sortie automatique liée à une ligne d’intervention validée",
      statut: "valide",
      dateMouvement: todayIsoDate(),
      createdAt: nowIso(),
    });

    const movementId = getRecordId(movement);

    await RuntimeDataBinding.update(stockModule, stockId, {
      ...stock,
      quantite: stockQuantityAfter,
      statut:
        stockQuantityAfter <= 0
          ? "rupture"
          : stock.seuilAlerte &&
              stockQuantityAfter <= getNumber(stock.seuilAlerte)
            ? "stock_faible"
            : "disponible",
      updatedAt: nowIso(),
    });

    await RuntimeDataBinding.update(lineModule, lineId, {
      ...line,
      stockMovementId: movementId,
      stockProcessedAt: todayIsoDate(),
      stockProcessedQuantity: quantity,
      updatedAt: nowIso(),
    });

    return {
      processed: true,
      movementId,
    };
  },
};
