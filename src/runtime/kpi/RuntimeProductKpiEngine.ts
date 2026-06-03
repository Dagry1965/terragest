import type { ERPRecordHubRecord } from "@/runtime/hub";

export type RuntimeProductPerformanceLabel =
  | "Produit phare"
  | "Produit courant"
  | "Produit dormant";

export type RuntimeProductStockState =
  | "OK"
  | "Stock faible"
  | "Rupture";

export type RuntimeProductKpiOrderLine = Record<string, unknown>;

export type RuntimeProductKpiInput = {
  rootRecord: ERPRecordHubRecord | null;
  stocks: ERPRecordHubRecord[];
  mouvements: ERPRecordHubRecord[];
  orderLineDeliveryItems: RuntimeProductKpiOrderLine[];
};

export type RuntimeProductKpiResult = {
  orderedQuantity: number;
  deliveredQuantity: number;
  remainingQuantity: number;
  stockQuantity: number;
  alertThreshold: number;
  stockState: RuntimeProductStockState;
  workshopQuantity: number;
  lastExitDate: string;
  performanceScore: number;
  performance: RuntimeProductPerformanceLabel;
};

function readNumber(
  record: Record<string, unknown> | null | undefined,
  keys: string[],
  fallback = 0
): number {
  if (!record) {
    return fallback;
  }

  for (const key of keys) {
    const value = Number(record[key] ?? Number.NaN);

    if (Number.isFinite(value)) {
      return value;
    }
  }

  return fallback;
}

function readText(
  record: Record<string, unknown> | null | undefined,
  keys: string[],
  fallback = ""
): string {
  if (!record) {
    return fallback;
  }

  for (const key of keys) {
    const value = String(record[key] ?? "").trim();

    if (value) {
      return value;
    }
  }

  return fallback;
}

function isWorkshopExitMovement(record: ERPRecordHubRecord): boolean {
  const type = readText(record, ["typeMouvement", "type", "sens"]).toLowerCase();
  const source = readText(record, ["sourceModule", "source", "module"]).toLowerCase();

  return (
    type.includes("sortie") ||
    source.includes("intervention") ||
    source.includes("vente")
  );
}

function computeStockState(
  stockQuantity: number,
  alertThreshold: number
): RuntimeProductStockState {
  if (stockQuantity <= 0) {
    return "Rupture";
  }

  if (alertThreshold > 0 && stockQuantity <= alertThreshold) {
    return "Stock faible";
  }

  return "OK";
}

function computePerformanceLabel(score: number): RuntimeProductPerformanceLabel {
  if (score >= 500) {
    return "Produit phare";
  }

  if (score >= 50) {
    return "Produit courant";
  }

  return "Produit dormant";
}

export const RuntimeProductKpiEngine = {
  compute(input: RuntimeProductKpiInput): RuntimeProductKpiResult {
    const orderedQuantity = input.orderLineDeliveryItems.reduce((sum, line) => {
      return sum + readNumber(line, ["quantityOrdered", "quantiteCommandee", "quantite"]);
    }, 0);

    const deliveredQuantity = input.orderLineDeliveryItems.reduce((sum, line) => {
      return sum + readNumber(line, ["quantityDelivered", "quantiteRecue", "quantiteLivree"]);
    }, 0);

    const remainingQuantity = Math.max(0, orderedQuantity - deliveredQuantity);

    const stockQuantity = input.stocks.reduce((sum, stock) => {
      return sum + readNumber(stock, [
        "stockQuantity",
        "quantite",
        "quantité",
        "currentStock",
        "stockActuel",
        "quantiteDisponible",
        "quantitéDisponible",
      ]);
    }, 0);

    const alertThreshold = readNumber(input.rootRecord, [
      "seuilAlerte",
      "stockMinimum",
      "minimumStock",
      "seuilStock",
    ]);

    const exitMovements = input.mouvements.filter(isWorkshopExitMovement);

    const workshopQuantity = exitMovements.reduce((sum, movement) => {
      return sum + Math.abs(readNumber(movement, ["quantite", "quantité", "quantity"]));
    }, 0);

    const lastExitDate =
      exitMovements
        .map((movement) =>
          readText(movement, ["dateMouvement", "date", "createdAt", "updatedAt"])
        )
        .filter(Boolean)
        .sort((a, b) => {
          const da = new Date(a).getTime();
          const db = new Date(b).getTime();

          return (Number.isFinite(db) ? db : 0) - (Number.isFinite(da) ? da : 0);
        })[0] ?? "";

    const stockState = computeStockState(stockQuantity, alertThreshold);
    const performanceScore = orderedQuantity + deliveredQuantity + workshopQuantity;
    const performance = computePerformanceLabel(performanceScore);

    return {
      orderedQuantity,
      deliveredQuantity,
      remainingQuantity,
      stockQuantity,
      alertThreshold,
      stockState,
      workshopQuantity,
      lastExitDate,
      performanceScore,
      performance,
    };
  },
};
