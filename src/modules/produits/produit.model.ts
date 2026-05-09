export type ProduitCategory =
  | "agricole"
  | "animal"
  | "piscicole"
  | "immobilier";

export type ProduitType =
  | "igname"
  | "manioc"
  | "arachide"
  | "mais"
  | "viande"
  | "oeufs"
  | "lait"
  | "tilapia"
  | "silure"
  | "maison"
  | "appartement";

export type ProduitStatus = "active" | "inactive";

export type ProduitStockMode = "stockable" | "non_stockable";

export type Produit = {
  id: string;
  code: string;
  nom: string;
  categorie: ProduitCategory;
  type: ProduitType;
  statut: ProduitStatus;
  modeStock: ProduitStockMode;
  unite?: string;
  seuilMinimum?: number;
  prixAchat?: number;
  prixVente?: number;
  createdAt: string;
  updatedAt: string;
};

export const PRODUIT_TYPES_BY_CATEGORY: Record<ProduitCategory, ProduitType[]> = {
  agricole: ["igname", "manioc", "arachide", "mais"],
  animal: ["viande", "oeufs", "lait"],
  piscicole: ["tilapia", "silure"],
  immobilier: ["maison", "appartement"],
};

export const PRODUIT_CATEGORY_LABELS: Record<ProduitCategory, string> = {
  agricole: "Agricole",
  animal: "Animal",
  piscicole: "Piscicole",
  immobilier: "Immobilier",
};

export const PRODUIT_TYPE_LABELS: Record<ProduitType, string> = {
  igname: "Igname",
  manioc: "Manioc",
  arachide: "Arachide",
  mais: "Maïs",
  viande: "Viande",
  oeufs: "Œufs",
  lait: "Lait",
  tilapia: "Tilapia",
  silure: "Silure",
  maison: "Maison",
  appartement: "Appartement",
};

export function getDefaultStockMode(
  categorie: ProduitCategory
): ProduitStockMode {
  return categorie === "immobilier" ? "non_stockable" : "stockable";
}