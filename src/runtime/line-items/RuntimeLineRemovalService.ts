import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { allERPModules } from "@/runtime/modules/definitions/coreModules";
import type { ERPModule } from "@/runtime/modules/ERPModule";

type RuntimeRecord = Record<string, unknown>;

export interface RuntimeLineRemovalParams {
  lineId: string;
  reason?: string;
  userId?: string;
}

export interface RuntimeLineRemovalResult {
  removed: boolean;
  reason?: string;
  lineId?: string;
  stockReversalMovementId?: string;
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

function isAlreadyRemoved(line: RuntimeRecord): boolean {
  return Boolean(line.removedAt);
}

function hasInvoiceLink(line: RuntimeRecord): boolean {
  return Boolean(
    line.factureId ??
      line.invoiceId ??
      line.documentId ??
      line.billingDocumentId
  );
}

function hasStockImpact(line: RuntimeRecord): boolean {
  return Boolean(line.stockMovementId);
}

function computeStockStatus(quantity: number, stock: RuntimeRecord): string {
  const alertThreshold = getNumber(stock.seuilAlerte);

  if (quantity <= 0) return "rupture";
  if (alertThreshold > 0 && quantity <= alertThreshold) return "stock_faible";

  return "disponible";
}

async function findStockRecord(
  stockModule: ERPModule,
  stockId: string
): Promise<RuntimeRecord | null> {
  const stocks = await RuntimeDataBinding.list(stockModule);
  return stocks.find((stock) => getRecordId(stock) === stockId) ?? null;
}

export const RuntimeLineRemovalService = {
  async removeInterventionLine({
    lineId,
    reason = "Ligne retirée par l'utilisateur.",
    userId = "system",
  }: RuntimeLineRemovalParams): Promise<RuntimeLineRemovalResult> {
    const lineModule = getModule("lignesinterventionauto");
    const stockModule = getModule("stocksauto");
    const movementModule = getModule("mouvementsstockauto");

    if (!lineModule || !stockModule || !movementModule) {
      return {
        removed: false,
        reason: "required-module-missing",
        lineId,
      };
    }

    const line = await RuntimeDataBinding.detail(lineModule, lineId);

    if (!line) {
      return {
        removed: false,
        reason: "line-not-found",
        lineId,
      };
    }

    if (isAlreadyRemoved(line)) {
      return {
        removed: false,
        reason: "already-removed",
        lineId,
      };
    }

    if (hasInvoiceLink(line)) {
      return {
        removed: false,
        reason: "line-linked-to-invoice",
        lineId,
      };
    }

    const removedAt = nowIso();
    const removedFromStatus = String(line.statut ?? "");
    let stockReversalMovementId = "";

    if (hasStockImpact(line)) {
      const stockId = String(line.stockId ?? "");
      const produitId = String(line.produitId ?? "");
      const interventionId = String(line.interventionId ?? "");
      const quantity =
        getNumber(line.stockProcessedQuantity) ||
        getNumber(line.quantite);

      if (!stockId || !produitId || quantity <= 0) {
        return {
          removed: false,
          reason: "missing-stock-product-or-quantity",
          lineId,
        };
      }

      const stock = await findStockRecord(stockModule, stockId);

      if (!stock) {
        return {
          removed: false,
          reason: "stock-not-found",
          lineId,
        };
      }

      const quantityBefore = getNumber(stock.quantite);
      const quantityAfter = quantityBefore + quantity;

      const reversalMovement = await RuntimeDataBinding.create(
        movementModule,
        {
          typeMouvement: "entree",
          stockId,
          produitId,
          quantite: quantity,
          quantiteAvant: quantityBefore,
          quantiteApres: quantityAfter,
          sourceModule: "lignesinterventionauto",
          sourceId: lineId,
          interventionId,
          ligneInterventionId: lineId,
          originalStockMovementId: String(line.stockMovementId ?? ""),
          motif:
            "Réintégration automatique liée au retrait d'une ligne d'intervention.",
          statut: "valide",
          dateMouvement: todayIsoDate(),
          createdAt: removedAt,
        }
      );

      stockReversalMovementId = getRecordId(reversalMovement);

      await RuntimeDataBinding.update(stockModule, stockId, {
        ...stock,
        quantite: quantityAfter,
        statut: computeStockStatus(quantityAfter, stock),
        updatedAt: removedAt,
      });
    }

    await RuntimeDataBinding.update(lineModule, lineId, {
      ...line,
      removedAt,
      removedBy: userId,
      removedReason: reason,
      removedFromStatus,
      stockReversalMovementId,
      updatedAt: removedAt,
    });

    return {
      removed: true,
      lineId,
      stockReversalMovementId: stockReversalMovementId || undefined,
    };
  },
};
