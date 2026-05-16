import type { Produit } from "./produit.model";
import { PRODUIT_TYPES_BY_CATEGORY } from "./produit.model";

export function validateProduit(produit: Partial<Produit>) {
  const errors: string[] = [];

  if (!produit.code) errors.push("Le code produit est obligatoire.");
  if (!produit.nom) errors.push("Le nom du produit est obligatoire.");
  if (!produit.categorie) errors.push("La catÃ©gorie est obligatoire.");
  if (!produit.type) errors.push("Le type de produit est obligatoire.");

  if (
    produit.categorie &&
    produit.type &&
    !PRODUIT_TYPES_BY_CATEGORY[produit.categorie].includes(produit.type)
  ) {
    errors.push("Le type de produit ne correspond pas Ã  la catÃ©gorie sÃ©lectionnÃ©e.");
  }

  if (produit.modeStock === "stockable" && !produit.unite) {
    errors.push("Un produit stockable doit avoir une unitÃ©.");
  }

  if (
    produit.seuilMinimum !== undefined &&
    produit.seuilMinimum < 0
  ) {
    errors.push("Le seuil minimum ne peut pas Ãªtre nÃ©gatif.");
  }

  if (
    produit.prixAchat !== undefined &&
    produit.prixAchat < 0
  ) {
    errors.push("Le prix d'achat ne peut pas Ãªtre nÃ©gatif.");
  }

  if (
    produit.prixVente !== undefined &&
    produit.prixVente < 0
  ) {
    errors.push("Le prix de vente ne peut pas Ãªtre nÃ©gatif.");
  }

  return errors;
}
