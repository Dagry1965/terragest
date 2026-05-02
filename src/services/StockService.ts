import { RessourceRepository } from "@/features/ressources/repositories/RessourceRepository";

import { ProduitRepository } from "@/features/produits/repositories/ProduitRepository";

export const StockService = {

  async applyMouvement(
    categorie: string,
    referenceId: string,
    sens: string,
    quantite: number
  ) {

    if (categorie === "RESSOURCE") {

      const ressource =
        await RessourceRepository.getById(
          referenceId
        );

      if (!ressource) {
        return;
      }

      const nouveauStock =
        sens === "ENTREE"
          ? ressource.stockActuel + quantite
          : ressource.stockActuel - quantite;

      await RessourceRepository.updateStock(
        referenceId,
        nouveauStock
      );
    }

    if (categorie === "PRODUIT") {

      const produit =
        await ProduitRepository.getById(
          referenceId
        );

      if (!produit) {
        return;
      }

      const nouveauStock =
        sens === "ENTREE"
          ? produit.stockActuel + quantite
          : produit.stockActuel - quantite;

      await ProduitRepository.updateStock(
        referenceId,
        nouveauStock
      );
    }
  },
};
