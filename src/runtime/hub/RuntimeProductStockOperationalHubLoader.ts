import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { produitsautoModule } from "@/runtime/modules/generated/produitsauto/produitsauto.module";
import { stocksautoModule } from "@/runtime/modules/generated/stocksauto/stocksauto.module";
import { mouvementsstockautoModule } from "@/runtime/modules/generated/mouvementsstockauto/mouvementsstockauto.module";
import { commandesstockautoModule } from "@/runtime/modules/generated/commandesstockauto/commandesstockauto.module";
import { lignescommandestockautoModule } from "@/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module";
import { receptionsstockautoModule } from "@/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module";
import { fournisseursautoModule } from "@/runtime/modules/generated/fournisseursauto/fournisseursauto.module";
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


function hubRelationIds(value: unknown): string[] {
  if (value === null || value === undefined) {
    return [];
  }

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    const raw = String(value).trim();

    if (!raw) {
      return [];
    }

    return Array.from(new Set([raw, ...raw.split(/[;,]/g).map((item) => item.trim()).filter(Boolean)]));
  }

  if (Array.isArray(value)) {
    return Array.from(new Set(value.flatMap((item) => hubRelationIds(item))));
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;

    return Array.from(
      new Set(
        ["id", "_id", "value", "key", "recordId", "refId", "uid", "docId"].flatMap((key) =>
          hubRelationIds(record[key])
        )
      )
    );
  }

  return [];
}

function hubRelationMatches(value: unknown, expectedId: string): boolean {
  const expected = String(expectedId ?? "").trim();

  if (!expected) {
    return false;
  }

  return hubRelationIds(value).some((id) => id === expected);
}

function hubRelationMatchesAny(value: unknown, expectedIds: Set<string>): boolean {
  if (expectedIds.size === 0) {
    return false;
  }

  return hubRelationIds(value).some((id) => expectedIds.has(id));
}

function getHubRecordId(record: ERPRecordHubRecord | null | undefined): string {
  if (!record) {
    return "";
  }

  return hubRelationIds(record.id ?? record._id)[0] ?? "";
}

function uniqueHubRecords(records: ERPRecordHubRecord[]): ERPRecordHubRecord[] {
  const seen = new Set<string>();

  return records.filter((record) => {
    const id = getHubRecordId(record);

    if (!id) {
      return true;
    }

    if (seen.has(id)) {
      return false;
    }

    seen.add(id);
    return true;
  });
}


function supplierBusinessLabel(supplier: ERPRecordHubRecord | null | undefined): string {
  if (!supplier) {
    return "";
  }

  return String(
    supplier.nom ??
      supplier.raisonSociale ??
      supplier.displayLabel ??
      supplier.label ??
      supplier.codeFournisseur ??
      ""
  ).trim();
}

function enrichOrderWithSupplier(
  order: ERPRecordHubRecord,
  suppliers: ERPRecordHubRecord[]
): ERPRecordHubRecord {
  const supplierIds = hubRelationIds(order.fournisseurId);
  const supplier =
    suppliers.find((item) => supplierIds.includes(getHubRecordId(item))) ?? null;

  if (!supplier) {
    return order;
  }

  const label = supplierBusinessLabel(supplier);

  return {
    ...order,
    fournisseurLabel: label,
    fournisseurNom: String(supplier.nom ?? label ?? ""),
    fournisseurCode: String(supplier.codeFournisseur ?? ""),
    fournisseurTelephone: String(supplier.telephone ?? ""),
    fournisseurEmail: String(supplier.email ?? ""),
    fournisseurVille: String(supplier.ville ?? ""),
  };
}

function enrichOrderWithProductLine(
  order: ERPRecordHubRecord,
  line: ERPRecordHubRecord | null
): ERPRecordHubRecord {
  if (!line) {
    return enrichRelatedRecord(order, "Commande");
  }

  return enrichRelatedRecord(
    {
      ...order,
      produitId: line.produitId ?? order.produitId,
      productLineId: getHubRecordId(line),
      quantiteCommandee: line.quantiteCommandee ?? line.quantite,
      productLineQuantity: line.quantiteCommandee ?? line.quantite,
      productLineStatus: line.statut ?? line.status,
      productLineAmountHT: line.montantHT,
      productLineAmountTTC: line.montantTTC,
    },
    "Commande"
  );
}

function enrichReceptionWithProductLine(
  reception: ERPRecordHubRecord,
  line: ERPRecordHubRecord | null
): ERPRecordHubRecord {
  if (!line) {
    return enrichRelatedRecord(reception, "Réception");
  }

  return enrichRelatedRecord(
    {
      ...reception,
      produitId: reception.produitId ?? line.produitId,
      commandeId: reception.commandeId ?? line.commandeId,
      productLineId: getHubRecordId(line),
      quantiteCommandee: line.quantiteCommandee ?? line.quantite,
      productLineQuantity: line.quantiteCommandee ?? line.quantite,
      productLineStatus: line.statut ?? line.status,
    },
    "Réception"
  );
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

    const [mouvements, commandes, lignesCommande, receptions, fournisseurs] = await Promise.all([
      safeList(mouvementsstockautoModule),
      safeList(commandesstockautoModule),
      safeList(lignescommandestockautoModule),
      safeList(receptionsstockautoModule),
      safeList(fournisseursautoModule),
    ]);


    const productMovements = filterByAnyProductKey(mouvements, productId);

    const productOrderLines = lignesCommande.filter((line) =>
      hubRelationMatches(line.produitId ?? line.productId ?? line.articleId, productId)
    );

    const productOrderLineIds = new Set(
      productOrderLines.map((line) => getHubRecordId(line)).filter(Boolean)
    );

    const productOrderIds = new Set(
      productOrderLines.flatMap((line) => hubRelationIds(line.commandeId)).filter(Boolean)
    );

    const productOrdersDirect = filterByAnyProductKey(commandes, productId);

    const productOrdersFromLines = commandes
      .filter((order) => productOrderIds.has(getHubRecordId(order)))
      .map((order) => {
        const orderId = getHubRecordId(order);
        const matchingLine =
          productOrderLines.find((line) => hubRelationMatches(line.commandeId, orderId)) ?? null;

        return enrichOrderWithSupplier(enrichOrderWithProductLine(order, matchingLine), fournisseurs);
      });

    const productOrders = uniqueHubRecords([
      ...productOrdersFromLines,
      ...productOrdersDirect.map((record) => enrichOrderWithSupplier(enrichRelatedRecord(record, "Commande"), fournisseurs)),
    ]);

    const productReceptionsDirect = filterByAnyProductKey(receptions, productId);

    const productReceptionsFromLines = receptions
      .filter((reception) =>
        hubRelationMatchesAny(reception.ligneCommandeId, productOrderLineIds) ||
        hubRelationMatchesAny(reception.commandeId, productOrderIds)
      )
      .map((reception) => {
        const matchingLine =
          productOrderLines.find((line) =>
            hubRelationMatches(reception.ligneCommandeId, getHubRecordId(line))
          ) ?? null;

        return enrichReceptionWithProductLine(reception, matchingLine);
      });

    const productReceptionsByStock = selectedStockId
      ? filterByAnyStockKey(receptions, selectedStockId).map((record) =>
          enrichRelatedRecord(record, "Réception")
        )
      : [];

    const productReceptions = uniqueHubRecords([
      ...productReceptionsFromLines,
      ...productReceptionsDirect.map((record) => enrichRelatedRecord(record, "Réception")),
      ...productReceptionsByStock,
    ]);

    relatedRecordsBySection.mouvements = (
      selectedStockId
        ? filterByAnyStockKey(mouvements, selectedStockId)
        : productMovements
    ).map((record) => enrichRelatedRecord(record, "Mouvement"));

    relatedRecordsBySection.commandes = productOrders;

    relatedRecordsBySection.receptions = productReceptions;
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
