import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { allERPModules } from "@/runtime/modules/definitions/coreModules";
import type { ERPModule } from "@/runtime/modules/ERPModule";

type RuntimeRecord = Record<string, unknown>;

interface ProcessInterventionLineStockParams {
  line: RuntimeRecord;
}

interface ProcessStockReceptionParams {
  reception: RuntimeRecord;
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
      statut: computeStockStatus(stockQuantityAfter, stock),
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
};
