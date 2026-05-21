export interface RuntimeLineItemProductSnapshot {
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
