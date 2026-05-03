import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase/config";

import { Organisation } from "@/types/organisation";

const COLLECTION_NAME = "organisations";

export const OrganisationRepository = {

  async create(data: Organisation) {

    return addDoc(
      collection(db, COLLECTION_NAME),
      data
    );
  },

  async getAll() {

    const snapshot = await getDocs(
      collection(db, COLLECTION_NAME)
    );

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  },
};
