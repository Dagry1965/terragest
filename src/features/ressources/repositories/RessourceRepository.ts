import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase/config";

import { Ressource } from "../types/Ressource";

const COLLECTION_NAME = "ressources";

export const RessourceRepository = {

  async create(data: Ressource) {

    return addDoc(
      collection(db, COLLECTION_NAME),
      data
    );
  },

  async getAllByOrganisation(
    organisationId: string
  ) {

    const q = query(
      collection(db, COLLECTION_NAME),
      where(
        "organisationId",
        "==",
        organisationId
      )
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async updateStock(
    id: string,
    stockActuel: number
  ) {

    const ref = doc(
      db,
      COLLECTION_NAME,
      id
    );

    await updateDoc(ref, {
      stockActuel,
    });
  },

  async getById(id: string) {

    const ref = doc(
      db,
      COLLECTION_NAME,
      id
    );

    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    } as Ressource;
  },
};
