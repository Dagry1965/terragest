import {

  getDocs,

  collection

} from "firebase/firestore";

import {

  db

} from "@/lib/firebase/firebase";

export const
DashboardAnalyticsService = {

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
