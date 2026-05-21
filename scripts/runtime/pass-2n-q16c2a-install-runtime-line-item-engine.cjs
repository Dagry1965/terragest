/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(...parts) {
  return path.join(root, ...parts);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, new UTF8EncodingWithoutBom());
}

function backup(file, suffix) {
  if (!fs.existsSync(file)) return;
  const target = `${file}.bak-${suffix}`;
  if (!fs.existsSync(target)) {
    fs.copyFileSync(file, target);
    console.log(`[BACKUP] ${path.relative(root, target)}`);
  }
}

function UTF8EncodingWithoutBom() {
  return "utf8";
}

function replaceOnce(content, from, to, label) {
  if (!content.includes(from)) {
    throw new Error(`[${label}] pattern introuvable`);
  }
  return content.replace(from, to);
}

function ensureRuntimeLineItemEngine() {
  const dir = p("src", "runtime", "line-items");
  const engineFile = p("src", "runtime", "line-items", "RuntimeLineItemEngine.ts");
  const indexFile = p("src", "runtime", "line-items", "index.ts");

  fs.mkdirSync(dir, { recursive: true });

  const engine = `export interface RuntimeLineItemProductSnapshot {
  id?: string;
  code?: unknown;
  reference?: unknown;
  nom?: unknown;
  designation?: unknown;
  typeArticle?: unknown;
  typeLigne?: unknown;
  prixPromo?: unknown;
  prixVente?: unknown;
  prixUnitaireHT?: unknown;
  prixUnitaire?: unknown;
  tauxTVA?: unknown;
  stockable?: unknown;
}

export interface RuntimeLineItemData {
  produitId?: unknown;
  produitCode?: unknown;
  produitNom?: unknown;
  typeArticle?: unknown;
  typeLigne?: unknown;
  designation?: unknown;
  quantite?: unknown;
  prixUnitaire?: unknown;
  prixUnitaireHT?: unknown;
  tauxTVA?: unknown;
  montantHT?: unknown;
  montantTVA?: unknown;
  montantTTC?: unknown;
  montantTotal?: unknown;
  [key: string]: unknown;
}

function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const normalized = value.replace(",", ".").trim();
    const parsed = Number(normalized);

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return fallback;
}

function toOptionalString(value: unknown): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  const text = String(value).trim();

  return text.length > 0 ? text : undefined;
}

function normalizeTypeArticle(value: unknown): string | undefined {
  const text = toOptionalString(value);

  if (!text) {
    return undefined;
  }

  if (text === "main_oeuvre" || text === "main-d-oeuvre" || text === "main d'oeuvre") {
    return "main_oeuvre";
  }

  if (text === "piece" || text === "pièce") {
    return "piece";
  }

  if (text === "service") {
    return "service";
  }

  if (text === "remise") {
    return "remise";
  }

  return text;
}

function getProductUnitPrice(product?: RuntimeLineItemProductSnapshot | null): number | undefined {
  if (!product) {
    return undefined;
  }

  const candidates = [
    product.prixPromo,
    product.prixUnitaireHT,
    product.prixVente,
    product.prixUnitaire,
  ];

  for (const candidate of candidates) {
    if (candidate === undefined || candidate === null || candidate === "") {
      continue;
    }

    const parsed = toNumber(candidate, Number.NaN);

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return undefined;
}

function getProductName(product?: RuntimeLineItemProductSnapshot | null): string | undefined {
  if (!product) {
    return undefined;
  }

  return (
    toOptionalString(product.nom) ??
    toOptionalString(product.designation) ??
    toOptionalString(product.reference) ??
    toOptionalString(product.code)
  );
}

function getProductCode(product?: RuntimeLineItemProductSnapshot | null): string | undefined {
  if (!product) {
    return undefined;
  }

  return (
    toOptionalString(product.code) ??
    toOptionalString(product.reference)
  );
}

export class RuntimeLineItemEngine {
  static enrichLineItem(
    line: RuntimeLineItemData,
    product?: RuntimeLineItemProductSnapshot | null
  ): RuntimeLineItemData {
    const next: RuntimeLineItemData = {
      ...line,
    };

    const productCode = getProductCode(product);
    const productName = getProductName(product);

    const productTypeArticle =
      normalizeTypeArticle(product?.typeArticle) ??
      normalizeTypeArticle(product?.typeLigne);

    const currentTypeLigne =
      normalizeTypeArticle(next.typeLigne);

    const typeArticle =
      normalizeTypeArticle(next.typeArticle) ??
      productTypeArticle ??
      currentTypeLigne ??
      "piece";

    const typeLigne =
      currentTypeLigne ??
      typeArticle;

    const quantity = toNumber(next.quantite, 1);
    const productPrice = getProductUnitPrice(product);

    const unitPriceHT =
      toNumber(
        next.prixUnitaireHT ?? next.prixUnitaire,
        productPrice ?? 0
      );

    const taxRate =
      toNumber(next.tauxTVA, toNumber(product?.tauxTVA, 18));

    const montantHT = quantity * unitPriceHT;
    const montantTVA = montantHT * taxRate / 100;
    const montantTTC = montantHT + montantTVA;

    if (productCode && !toOptionalString(next.produitCode)) {
      next.produitCode = productCode;
    }

    if (productName && !toOptionalString(next.produitNom)) {
      next.produitNom = productName;
    }

    if (!toOptionalString(next.designation) && productName) {
      next.designation = productName;
    }

    next.typeArticle = typeArticle;
    next.typeLigne = typeLigne;

    next.quantite = quantity;
    next.prixUnitaireHT = unitPriceHT;
    next.prixUnitaire = unitPriceHT;

    next.tauxTVA = taxRate;
    next.montantHT = montantHT;
    next.montantTVA = montantTVA;
    next.montantTTC = montantTTC;

    // Compatibilité Q16B : les totaux intervention existants lisent encore montantTotal.
    next.montantTotal = montantHT;

    return next;
  }
}
`;

  const index = `export {
  RuntimeLineItemEngine,
} from "./RuntimeLineItemEngine";

export type {
  RuntimeLineItemData,
  RuntimeLineItemProductSnapshot,
} from "./RuntimeLineItemEngine";
`;

  write(engineFile, engine);
  write(indexFile, index);

  console.log(`[WRITTEN] ${path.relative(root, engineFile)}`);
  console.log(`[WRITTEN] ${path.relative(root, indexFile)}`);
}

function patchLignesInterventionModule() {
  const file = p(
    "src",
    "runtime",
    "modules",
    "generated",
    "lignesinterventionauto",
    "lignesinterventionauto.module.ts"
  );

  backup(file, "q16c2a-line-item-snapshots");

  let content = read(file);

  if (!content.includes('key: "produitCode"')) {
    const anchor = `      {
        key: "stockId",
        label: "Stock source",
        type: "relation",
        relation: { module: "stocksauto" },
        searchable: true,
        grid: { cols: 6 },
      },`;

    const insertion = `${anchor}
      {
        key: "produitCode",
        label: "Code produit",
        type: "text",
        list: { order: 3 },
        grid: { cols: 4 },
      },
      {
        key: "produitNom",
        label: "Nom produit",
        type: "text",
        searchable: true,
        list: { order: 4 },
        grid: { cols: 8 },
      },
      {
        key: "typeArticle",
        label: "Type article",
        type: "select",
        defaultValue: "piece",
        options: [
          { label: "Pièce", value: "piece" },
          { label: "Main d’œuvre", value: "main_oeuvre" },
          { label: "Service", value: "service" },
          { label: "Remise", value: "remise" },
        ],
        grid: { cols: 4 },
      },`;

    content = replaceOnce(
      content,
      anchor,
      insertion,
      "insert product snapshot fields"
    );
  }

  if (!content.includes('key: "prixUnitaireHT"')) {
    const anchor = `      {
        key: "prixUnitaire",
        label: "Prix unitaire",
        type: "number",
        defaultValue: 0,
        required: true,
        list: { order: 6 },
        grid: { cols: 4 },
      },`;

    const insertion = `${anchor}
      {
        key: "prixUnitaireHT",
        label: "Prix unitaire HT",
        type: "number",
        defaultValue: 0,
        grid: { cols: 4 },
      },
      {
        key: "tauxTVA",
        label: "TVA (%)",
        type: "number",
        defaultValue: 18,
        grid: { cols: 4 },
      },
      {
        key: "montantHT",
        label: "Montant HT",
        type: "number",
        grid: { cols: 4 },
      },
      {
        key: "montantTVA",
        label: "Montant TVA",
        type: "number",
        grid: { cols: 4 },
      },
      {
        key: "montantTTC",
        label: "Montant TTC",
        type: "number",
        grid: { cols: 4 },
      },`;

    content = replaceOnce(
      content,
      anchor,
      insertion,
      "insert price snapshot fields"
    );
  }

  content = content.replace(
    `"designation",
          "typeLigne",
          "produitId",
          "stockId",
          "quantite",
          "prixUnitaire",
          "montantTotal",
          "statut",`,
    `"designation",
          "typeLigne",
          "produitId",
          "stockId",
          "produitCode",
          "produitNom",
          "typeArticle",
          "quantite",
          "prixUnitaire",
          "prixUnitaireHT",
          "tauxTVA",
          "montantHT",
          "montantTVA",
          "montantTTC",
          "montantTotal",
          "statut",`
  );

  content = content.replace(
    `            fields: [
              "produitId",
              "stockId",
            ],`,
    `            fields: [
              "produitId",
              "stockId",
              "produitCode",
              "produitNom",
              "typeArticle",
            ],`
  );

  content = content.replace(
    `            fields: [
              "quantite",
              "prixUnitaire",
              "montantTotal",
            ],`,
    `            fields: [
              "quantite",
              "prixUnitaire",
              "prixUnitaireHT",
              "tauxTVA",
              "montantHT",
              "montantTVA",
              "montantTTC",
              "montantTotal",
            ],`
  );

  content = content.replace(
    `    lockedFields: [
      "interventionId",
      "montantTotal",
      "stockMovementId",
      "stockProcessedAt",
      "stockProcessedQuantity",
    ],`,
    `    lockedFields: [
      "interventionId",
      "produitCode",
      "produitNom",
      "typeArticle",
      "prixUnitaireHT",
      "tauxTVA",
      "montantHT",
      "montantTVA",
      "montantTTC",
      "montantTotal",
      "stockMovementId",
      "stockProcessedAt",
      "stockProcessedQuantity",
    ],`
  );

  content = content.replace(
    `    readOnlyFields: [
      "stockMovementId",
      "stockProcessedAt",
      "stockProcessedQuantity",
    ],`,
    `    readOnlyFields: [
      "produitCode",
      "produitNom",
      "typeArticle",
      "prixUnitaireHT",
      "tauxTVA",
      "montantHT",
      "montantTVA",
      "montantTTC",
      "montantTotal",
      "stockMovementId",
      "stockProcessedAt",
      "stockProcessedQuantity",
    ],`
  );

  write(file, content);
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function patchFirestoreMutation() {
  const file = p("src", "runtime", "firestore", "FirestoreRuntimeMutation.ts");
  backup(file, "q16c2a-line-item-engine");

  let content = read(file);

  if (!content.includes('from "@/runtime/line-items"')) {
    content = content.replace(
      `import {
  RuntimeContextEnforcer,
} from "@/runtime/context";`,
      `import {
  RuntimeContextEnforcer,
} from "@/runtime/context";

import {
  RuntimeLineItemEngine,
} from "@/runtime/line-items";

import {
  produitsautoModule,
} from "@/runtime/modules/generated/produitsauto/produitsauto.module";`
    );
  }

  if (!content.includes("async function applyRuntimeLineItemSnapshots")) {
    const anchor = `function applyComputedFields(
  module: ERPModule,
  data: Record<string, unknown>
) {
  const nextData = {
    ...data,
  };

  for (const field of module.schema.fields) {
    if (!field.computed) {
      continue;
    }

    const computedValue =
      RuntimeComputedEngine.compute(
        field.computed.formula,
        nextData
      );

    nextData[field.key] =
      computedValue;
  }

  return sanitizeFirestoreData(nextData);
}
`;

    const insertion = `${anchor}

async function applyRuntimeLineItemSnapshots(
  module: ERPModule,
  data: Record<string, unknown>
): Promise<Record<string, unknown>> {
  if (module.metadata.key !== "lignesinterventionauto") {
    return data;
  }

  const produitId =
    String(data.produitId ?? "").trim();

  if (!produitId) {
    return RuntimeLineItemEngine.enrichLineItem(data);
  }

  try {
    const product =
      await FirestoreRuntimeRepository.findById(
        produitsautoModule,
        produitId
      );

    return RuntimeLineItemEngine.enrichLineItem(
      data,
      product
    );
  } catch (error) {
    console.error(
      "[RUNTIME_LINE_ITEM_PRODUCT_SNAPSHOT_ERROR]",
      error
    );

    return RuntimeLineItemEngine.enrichLineItem(data);
  }
}
`;

    content = replaceOnce(
      content,
      anchor,
      insertion,
      "insert applyRuntimeLineItemSnapshots"
    );
  }

  content = content.replace(
    `    const computedData =
      applyComputedFields(
        module,
        isolatedData
      );

    const guardedData =`,
    `    const lineItemData =
      await applyRuntimeLineItemSnapshots(
        module,
        isolatedData
      );

    const computedData =
      applyComputedFields(
        module,
        lineItemData
      );

    const guardedData =`
  );

  content = content.replace(
    `const isolatedData =
      enforceRuntimeWriteContext(
        module,
        data
      );

    const computedData =
      applyComputedFields(
        module,
        isolatedData
      );

    const guardedData =`,
    `const isolatedData =
      enforceRuntimeWriteContext(
        module,
        data
      );

    const lineItemData =
      await applyRuntimeLineItemSnapshots(
        module,
        isolatedData
      );

    const computedData =
      applyComputedFields(
        module,
        lineItemData
      );

    const guardedData =`
  );

  write(file, content);
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function main() {
  console.log("");
  console.log("[PASS] 2N-Q16C2A - Runtime line item snapshots");
  ensureRuntimeLineItemEngine();
  patchLignesInterventionModule();
  patchFirestoreMutation();

  console.log("");
  console.log("[Q16C2A_DONE]");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  tester création/modification ligne intervention avec produit");
  console.log("  git status --short");
}

main();