const fs = require("fs");
const path = require("path");

const root = process.cwd();

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function write(relativePath, content) {
  fs.writeFileSync(path.join(root, relativePath), content, "utf8");
  console.log("[WRITTEN]", relativePath);
}

function backup(relativePath, suffix) {
  const fullPath = path.join(root, relativePath);
  const backupPath = `${fullPath}.${suffix}`;
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(fullPath, backupPath);
    console.log("[BACKUP]", path.relative(root, backupPath));
  }
}

const loaderPath = "src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts";
const kpiResolverPath = "src/runtime/hub/RuntimeHubKpiResolver.ts";
const selectedPath = "src/components/erp/hub/ERPRecordHubSelectedDetails.tsx";
const primaryPath = "src/components/erp/hub/ERPRecordHubPrimaryCollection.tsx";

for (const file of [loaderPath, kpiResolverPath, selectedPath, primaryPath]) {
  if (!fs.existsSync(path.join(root, file))) {
    console.error("[MISSING]", file);
    process.exit(1);
  }
}

backup(loaderPath, "bak-q2ok-c-product-stock-view-model");
backup(kpiResolverPath, "bak-q2ok-c-product-stock-view-model");
backup(selectedPath, "bak-q2ok-c-product-stock-view-model");
backup(primaryPath, "bak-q2ok-c-product-stock-view-model");

/**
 * 1. Patch RuntimeHubKpiResolver.
 * Generic behavior:
 * - if kpi.field exists and rootRecord contains a primitive value, render it.
 * - otherwise safe fallback "\u2014".
 */
const nextKpiResolver = `import type {
  ERPRecordHubConfig,
  ERPRecordHubRecord,
  ERPRecordHubResolvedKpi,
} from "./RuntimeHubTypes";

function normalizeKpiValue(value: unknown): string | number {
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  if (typeof value === "boolean") {
    return value ? "Oui" : "Non";
  }

  return "\\u2014";
}

export class RuntimeHubKpiResolver {
  static resolveStatic(
    config: ERPRecordHubConfig,
    rootRecord?: ERPRecordHubRecord | null
  ): ERPRecordHubResolvedKpi[] {
    const kpis = config.kpis ?? [];

    return kpis.map((kpi) => {
      const value =
        kpi.field && rootRecord
          ? normalizeKpiValue(rootRecord[kpi.field])
          : "\\u2014";

      return {
        key: kpi.key,
        label: kpi.label,
        value,
        format: kpi.format,
      };
    });
  }
}
`;

write(kpiResolverPath, nextKpiResolver);

/**
 * 2. Patch loader with generic helper functions and enriched root/stock records.
 */
let loader = read(loaderPath);

const helperMarker = "function findById(";

const helperBlock = `function readFirstString(
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
    "annul\\u00e9e",
    "annule",
    "annul\\u00e9",
    "cloturee",
    "cl\\u00f4tur\\u00e9e",
    "terminee",
    "termin\\u00e9e",
    "fermee",
    "ferm\\u00e9e",
    "receptionnee",
    "r\\u00e9ceptionn\\u00e9e",
    "livree",
    "livr\\u00e9e",
    "archivee",
    "archiv\\u00e9e",
  ];

  return !closedStatuses.includes(status);
}

function buildBusinessLabel(record: ERPRecordHubRecord, fallback: string): string {
  const label = readFirstString(record, [
    "displayLabel",
    "label",
    "libelle",
    "libell\\u00e9",
    "nom",
    "name",
    "designation",
    "d\\u00e9signation",
    "titre",
    "title",
    "emplacement",
    "code",
    "reference",
    "r\\u00e9f\\u00e9rence",
    "numero",
    "num\\u00e9ro",
    "numeroCommande",
    "num\\u00e9roCommande",
    "immatriculation",
  ]);

  return label || fallback;
}

function enrichStockRecord(record: ERPRecordHubRecord): ERPRecordHubRecord {
  const quantity = readNumber(record, [
    "quantite",
    "quantit\\u00e9",
    "currentStock",
    "stockActuel",
    "quantiteDisponible",
    "quantit\\u00e9Disponible",
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
    "quantit\\u00e9",
    "currentStock",
    "stockActuel",
    "quantiteDisponible",
    "quantit\\u00e9Disponible",
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

`;

if (!loader.includes("function readFirstString(")) {
  loader = loader.replace(helperMarker, helperBlock + "\n" + helperMarker);
}

const oldBlock = `    const stocks = await safeList(stocksautoModule);
    const primaryRecords = filterByAnyProductKey(stocks, productId);

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

    relatedRecordsBySection.mouvements = selectedStockId
      ? filterByAnyStockKey(mouvements, selectedStockId)
      : filterByAnyProductKey(mouvements, productId);

    relatedRecordsBySection.commandes = filterByAnyProductKey(commandes, productId);

    relatedRecordsBySection.receptions = selectedStockId
      ? filterByAnyStockKey(receptions, selectedStockId)
      : filterByAnyProductKey(receptions, productId);

    return {
      config: input.config,
      rootRecord,
      primaryRecords,
      relatedRecordsBySection,
    };`;

const newBlock = `    const stocks = await safeList(stocksautoModule);
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
    ).map((record) => enrichRelatedRecord(record, "R\\u00e9ception"));

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
    };`;

if (!loader.includes(oldBlock)) {
  console.error("[PATCH_FAILED] Expected loader block not found.");
  process.exit(1);
}

loader = loader.replace(oldBlock, newBlock);
write(loaderPath, loader);

/**
 * 3. Patch generic fallback fields in selected details.
 */
let selected = read(selectedPath);

selected = selected.replace(
  `const preferredFields = ["nom", "name", "label", "code", "immatriculation", "numero", "titre"];`,
  `const preferredFields = [
    "displayLabel",
    "label",
    "libelle",
    "nom",
    "name",
    "designation",
    "titre",
    "emplacement",
    "code",
    "reference",
    "numero",
    "immatriculation",
  ];`
);

selected = selected.replace(
  `return String(record.id ?? "Élément lié");`,
  `return "\\u00c9l\\u00e9ment li\\u00e9";`
);

selected = selected.replace(
  `return String(record.id ?? "\\u00c9l\\u00e9ment li\\u00e9");`,
  `return "\\u00c9l\\u00e9ment li\\u00e9";`
);

write(selectedPath, selected);

/**
 * 4. Patch primary collection fallback to avoid raw technical id display.
 */
let primary = read(primaryPath);

primary = primary.replace(
  `const values = fields
    .map((field) => record[field])
    .filter((value) => typeof value === "string" || typeof value === "number")
    .map((value) => String(value));`,
  `const fallbackFields =
    fields.length > 0
      ? fields
      : [
          "displayLabel",
          "label",
          "libelle",
          "nom",
          "name",
          "designation",
          "titre",
          "emplacement",
          "code",
          "reference",
          "numero",
          "immatriculation",
        ];

  const values = fallbackFields
    .map((field) => record[field])
    .filter((value) => typeof value === "string" || typeof value === "number")
    .map((value) => String(value));`
);

primary = primary.replace(
  `return String(record.id ?? "Élément");`,
  `return "\\u00c9l\\u00e9ment";`
);

primary = primary.replace(
  `return String(record.id ?? "\\u00c9l\\u00e9ment");`,
  `return "\\u00c9l\\u00e9ment";`
);

write(primaryPath, primary);

console.log("[Q2-OK-C] Product / Stock Hub view model polish applied.");
console.log("Next:");
console.log("  pnpm build");
console.log("  node .\\\\scripts\\\\runtime\\\\q2ok-b-audit-product-stock-hub-view-model.cjs");