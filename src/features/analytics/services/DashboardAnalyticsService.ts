import {
  collection,
  getDocs
} from "firebase/firestore";

import { db }
from "@/lib/firebase/firebase";

export const
DashboardAnalyticsService = {

  async getStats() {

    const [

      produits,

      exploitations,

      interventions,

      materiels,

      mouvements

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
          "interventions"
        )
      ),

      getDocs(
        collection(
          db,
          "materiels"
        )
      ),

      getDocs(
        collection(
          db,
          "mouvements_stock"
        )
      ),
    ]);

    return {

      produits:
        produits.size,

      exploitations:
        exploitations.size,

      interventions:
        interventions.size,

      materiels:
        materiels.size,

      mouvements:
        mouvements.size,
    };
  },
};