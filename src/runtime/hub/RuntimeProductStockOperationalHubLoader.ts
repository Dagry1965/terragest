import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { produitsautoModule } from "@/runtime/modules/generated/produitsauto/produitsauto.module";
import { stocksautoModule } from "@/runtime/modules/generated/stocksauto/stocksauto.module";
import { mouvementsstockautoModule } from "@/runtime/modules/generated/mouvementsstockauto/mouvementsstockauto.module";
import { commandesstockautoModule } from "@/runtime/modules/generated/commandesstockauto/commandesstockauto.module";
import { receptionsstockautoModule } from "@/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module";
import type { ERPModule } from "@/runtime/modules/ERPModule";
import type {
  ERPRecordHubConfig,
  ERPRecordHubRecord,
} from "./RuntimeHubTypes";

export type RuntimeProductStockOperationalHubLoadResult = {
  config: ERPRecordHubConfig;
  rootRecord: ERPRecordHubRecord | null;
  primaryRecords: ERPRecordHubRecord[];
  relatedRecordsBySection: Record<string, ERPRecordHubRecord[]>;
};

export type RuntimeProductStockOperationalHubLoaderInput = {
  config: ERPRecordHubConfig;
  productId?: string | null;
  selectedStockId?: string | null;
};

function normalizeRecord(record: unknown): ERPRecordHubRecord | null {
  if (!record || typeof record !== "object") {
    return null;
  }

  return record as ERPRecordHubRecord;
}

function normalizeRecords(records: unknown): ERPRecordHubRecord[] {
  if (!Array.isArray(records)) {
    return [];
  }

  return records.filter((record): record is ERPRecordHubRecord => {
    return !!record && typeof record === "object";
  });
}

function moduleLabel(module: ERPModule): string {
  return module.metadata?.key ?? "unknown-module";
}

async function safeDetail(
  module: ERPModule,
  recordId: string
): Promise<ERPRecordHubRecord | null> {
  try {
    return normalizeRecord(await RuntimeDataBinding.detail(module, recordId));
  } catch (error) {
    console.warn(
      "[RuntimeProductStockOperationalHubLoader] detail failed:",
      moduleLabel(module),
      recordId,
      error
    );

    return null;
  }
}

async function safeList(module: ERPModule): Promise<ERPRecordHubRecord[]> {
  try {
    return normalizeRecords(await RuntimeDataBinding.list(module));
  } catch (error) {
    console.warn(
      "[RuntimeProductStockOperationalHubLoader] list failed:",
      moduleLabel(module),
      error
    );

    return [];
  }
}

function filterByAnyProductKey(
  records: ERPRecordHubRecord[],
  productId: string
): ERPRecordHubRecord[] {
  const possibleKeys = ["produitId", "productId", "articleId"];

  return records.filter((record) => {
    return possibleKeys.some((key) => String(record[key] ?? "") === productId);
  });
}

function filterByAnyStockKey(
  records: ERPRecordHubRecord[],
  stockId: string
): ERPRecordHubRecord[] {
  const possibleKeys = ["stockId", "stockSourceId", "stockDestinationId"];

  return records.filter((record) => {
    return possibleKeys.some((key) => String(record[key] ?? "") === stockId);
  });
}

function readFirstString(
  record: ERPRecordHubRecord,
  fields: string[]
): string {
  for (const field of fields) {
    const value = record[field];

    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }

    if (typeof value === "number" && Number.isFinite(value)) {
      return String(value);
    }
  }

  return "";
}

function readNumber(record: ERPRecordHubRecord, fields: string[]): number {
  for (const field of fields) {
    const value = record[field];

    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string") {
      const normalized = Number(value.replace(",", "."));
      if (Number.isFinite(normalized)) {
        return normalized;
      }
    }
  }

  return 0;
}

function sumRecords(records: ERPRecordHubRecord[], fields: string[]): number {
  return records.reduce((total, record) => total + readNumber(record, fields), 0);
}

function isOpenBusinessRecord(record: ERPRecordHubRecord): boolean {
  const status = String(
    record.statut ??
      record.status ??
      record.etat ??
      record.state ??
      ""
  )
    .trim()
    .toLowerCase();

  if (!status) {
    return true;
  }

  const closedStatuses = [
    "annulee",
    "annul\u00e9e",
    "annule",
    "annul\u00e9",
    "cloturee",
    "cl\u00f4tur\u00e9e",
    "terminee",
    "termin\u00e9e",
    "fermee",
    "ferm\u00e9e",
    "receptionnee",
    "r\u00e9ceptionn\u00e9e",
    "livree",
    "livr\u00e9e",
    "archivee",
    "archiv\u00e9e",
  ];

  return !closedStatuses.includes(status);
}

function buildBusinessLabel(record: ERPRecordHubRecord, fallback: string): string {
  const label = readFirstString(record, [
    "displayLabel",
    "label",
    "libelle",
    "libell\u00e9",
    "nom",
    "name",
    "designation",
    "d\u00e9signation",
    "titre",
    "title",
    "emplacement",
    "code",
    "reference",
    "r\u00e9f\u00e9rence",
    "numero",
    "num\u00e9ro",
    "numeroCommande",
    "num\u00e9roCommande",
    "immatriculation",
  ]);

  return label || fallback;
}

function enrichStockRecord(record: ERPRecordHubRecord): ERPRecordHubRecord {
  const quantity = readNumber(record, [
    "quantite",
    "quantit\u00e9",
    "currentStock",
    "stockActuel",
    "quantiteDisponible",
    "quantit\u00e9Disponible",
  ]);

  const label = buildBusinessLabel(record, "Stock");

  return {
    ...record,
    label,
    displayLabel: label,
    titre: label,
    stockQuantity: quantity,
  };
}

function enrichRelatedRecord(
  record: ERPRecordHubRecord,
  fallback: string
): ERPRecordHubRecord {
  const label = buildBusinessLabel(record, fallback);

  return {
    ...record,
    label,
    displayLabel: label,
    titre: label,
  };
}

function enrichRootRecord(
  rootRecord: ERPRecordHubRecord,
  primaryRecords: ERPRecordHubRecord[],
  productMovements: ERPRecordHubRecord[],
  productOrders: ERPRecordHubRecord[],
  productReceptions: ERPRecordHubRecord[]
): ERPRecordHubRecord {
  const stockTotal = sumRecords(primaryRecords, [
    "quantite",
    "quantit\u00e9",
    "currentStock",
    "stockActuel",
    "quantiteDisponible",
    "quantit\u00e9Disponible",
    "stockQuantity",
  ]);

  const stockCount = primaryRecords.length;
  const openOrders = productOrders.filter(isOpenBusinessRecord).length;
  const recentMovements = productMovements.length;
  const receptionsCount = productReceptions.length;

  const productLabel = buildBusinessLabel(rootRecord, "Produit");

  return {
    ...rootRecord,
    label: productLabel,
    displayLabel: productLabel,
    titre: productLabel,

    stockTotal,
    totalStock: stockTotal,
    quantiteTotale: stockTotal,
    quantityTotal: stockTotal,

    stockCount,
    nombreStocks: stockCount,

    openOrders,
    commandesOuvertes: openOrders,
    commandeCount: openOrders,

    recentMovements,
    mouvementsRecents: recentMovements,
    mouvementsCount: recentMovements,

    receptionsCount,
    nombreReceptions: receptionsCount,
  };
}


function findById(
  records: ERPRecordHubRecord[],
  id?: string | null
): ERPRecordHubRecord | null {
  if (!id) {
    return null;
  }

  return records.find((record) => String(record.id ?? "") === String(id)) ?? null;
}

export class RuntimeProductStockOperationalHubLoader {
  static async load(
    input: RuntimeProductStockOperationalHubLoaderInput
  ): Promise<RuntimeProductStockOperationalHubLoadResult> {
    const productId = input.productId ? String(input.productId) : "";

    /**
     * Important:
     * Do not blindly list products when /produitsauto/hub is opened without productId.
     * Firestore can emit server-side GRPC logs even when errors are caught.
     * The hub must wait for an explicit productId before loading runtime data.
     */
    if (!productId) {
      return {
        config: input.config,
        rootRecord: null,
        primaryRecords: [],
        relatedRecordsBySection: {
          mouvements: [],
          commandes: [],
          receptions: [],
        },
      };
    }

    const rootRecord = await safeDetail(produitsautoModule, productId);

    if (!rootRecord) {
      return {
        config: input.config,
        rootRecord: null,
        primaryRecords: [],
        relatedRecordsBySection: {
          mouvements: [],
          commandes: [],
          receptions: [],
        },
      };
    }

    const stocks = await safeList(stocksautoModule);
    const primaryRecords = filterByAnyProductKey(stocks, productId).map(enrichStockRecord);

    const selectedStock =
      findById(primaryRecords, input.selectedStockId) ?? primaryRecords[0] ?? null;

    const selectedStockId = String(selectedStock?.id ?? input.selectedStockId ?? "");

    const relatedRecordsBySection: Record<string, ERPRecordHubRecord[]> = {
      mouvements: [],
      commandes: [],
      receptions: [],
    };

    const [mouvements, commandes, receptions] = await Promise.all([
      safeList(mouvementsstockautoModule),
      safeList(commandesstockautoModule),
      safeList(receptionsstockautoModule),
    ]);

    const productMovements = filterByAnyProductKey(mouvements, productId);
    const productOrders = filterByAnyProductKey(commandes, productId);
    const productReceptions = filterByAnyProductKey(receptions, productId);

    relatedRecordsBySection.mouvements = (
      selectedStockId
        ? filterByAnyStockKey(mouvements, selectedStockId)
        : productMovements
    ).map((record) => enrichRelatedRecord(record, "Mouvement"));

    relatedRecordsBySection.commandes = productOrders.map((record) =>
      enrichRelatedRecord(record, "Commande")
    );

    relatedRecordsBySection.receptions = (
      selectedStockId
        ? filterByAnyStockKey(receptions, selectedStockId)
        : productReceptions
    ).map((record) => enrichRelatedRecord(record, "R\u00e9ception"));

    const enrichedRootRecord = enrichRootRecord(
      rootRecord,
      primaryRecords,
      productMovements,
      productOrders,
      productReceptions
    );

    return {
      config: input.config,
      rootRecord: enrichedRootRecord,
      primaryRecords,
      relatedRecordsBySection,
    };
  }
}
