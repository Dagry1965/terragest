import {
  collection,
  getDocs,
} from "firebase/firestore";

import {
  db,
} from "@/lib/firebase/firebase";

export const AnalyticsRepository = {

  async getProducts() {

    const snapshot =
      await getDocs(

        collection(
          db,
          "products"
        )
      );

    return snapshot.docs.map(
      (doc) => ({

        id: doc.id,

        ...doc.data(),
      })
    );
  },

  async getTransactions() {

    const snapshot =
      await getDocs(

        collection(
          db,
          "transactions"
        )
      );

    return snapshot.docs.map(
      (doc) => ({

        id: doc.id,

        ...doc.data(),
      })
    );
  },
};
