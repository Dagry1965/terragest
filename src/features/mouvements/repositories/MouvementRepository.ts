import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

import { Mouvement } from "../types/Mouvement";

const COLLECTION_NAME = "mouvements";

export const MouvementRepository = {

  async create(data: Mouvement) {

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
      ),
      orderBy(
        "createdAt",
        "desc"
      )
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  },
};
