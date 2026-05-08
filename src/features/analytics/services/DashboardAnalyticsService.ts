import {

  getDocs,

  collection

} from "firebase/firestore";

import {

  db

} from "@/lib/firebase/config";

export const
Tableau de bordAnalyticsService = {

  async getStats() {

    const [

      produits,

      exploitations,

      stocks,

      materiels

    ] = await Promise.all([

      getDocs(
        collection(
          db,
          "produits"
        )
      ),

      getDocs(
        collection(
          db,
          "exploitations"
        )
      ),

      getDocs(
        collection(
          db,
          "mouvements_stock"
        )
      ),

      getDocs(
        collection(
          db,
          "materiels"
        )
      ),
    ]);

    return {

      produits:
        produits.size,

      exploitations:
        exploitations.size,

      stocks:
        stocks.size,

      materiels:
        materiels.size,
    };
  },
};
