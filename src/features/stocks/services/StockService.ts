import type { Produit }
from "@/features/produits/types/Produit";

import { MOUVEMENT_STOCK }
from "../types/MOUVEMENT_STOCK";

export class StockService {

  static calculerNouveauStock(

    stockActuel: number,

    quantite: number,

    type: MOUVEMENT_STOCK

  ): number {

    switch (type) {

      case MOUVEMENT_STOCK.ENTREE:

        return stockActuel + quantite;

      case MOUVEMENT_STOCK.SORTIE:

        return stockActuel - quantite;

      case MOUVEMENT_STOCK.AJUSTEMENT:

        return quantite;

      default:

        return stockActuel;
    }
  }

  static verifierRupture(
    produit: Produit
  ): boolean {

    return (
      produit.stockActuel <=
      produit.seuilAlerte
    );
  }
}
