import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase/config";

export const BillingService = {

  async createSubscription(
    data: any
  ) {

    return addDoc(
      collection(
        db,
        "subscriptions"
      ),
      data
    );
  },

  async getSubscription(
    organisationId: string
  ) {

    const ref =
      doc(
        db,
        "subscriptions",
        organisationId
      );

    const snapshot =
      await getDoc(ref);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  },

  async updateSubscription(
    organisationId: string,
    data: any
  ) {

    return updateDoc(
      doc(
        db,
        "subscriptions",
        organisationId
      ),
      data
    );
  },
};
