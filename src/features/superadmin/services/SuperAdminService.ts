import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase/config";

export const SuperAdminService = {

  async getPlatformStats() {

    const [
      organisations,
      utilisateurs,
      subscriptions,
      produits,
    ] = await Promise.all([

      getDocs(
        collection(
          db,
          "organisations"
        )
      ),

      getDocs(
        collection(
          db,
          "utilisateurs"
        )
      ),

      getDocs(
        collection(
          db,
          "subscriptions"
        )
      ),

      getDocs(
        collection(
          db,
          "produits"
        )
      ),
    ]);

    return {

      organisations:
        organisations.size,

      utilisateurs:
        utilisateurs.size,

      subscriptions:
        subscriptions.size,

      produits:
        produits.size,
    };
  },
};
