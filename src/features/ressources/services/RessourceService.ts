import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

import { COLLECTIONS } from "@/constants/collections";

export const RessourceService = {

  async create(data: any) {

    return addDoc(
      collection(
        db,
        COLLECTIONS.RESSOURCES
      ),
      data
    );
  },

  async getById(id: string) {

    const snapshot = await getDoc(
      doc(
        db,
        COLLECTIONS.RESSOURCES,
        id
      )
    );

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  },

  async update(
    id: string,
    data: any
  ) {

    return updateDoc(
      doc(
        db,
        COLLECTIONS.RESSOURCES,
        id
      ),
      data
    );
  },

  async delete(id: string) {

    return deleteDoc(
      doc(
        db,
        COLLECTIONS.RESSOURCES,
        id
      )
    );
  },

  async getAllByOrganisation(
    organisationId: string
  ) {

    const q = query(
      collection(
        db,
        COLLECTIONS.RESSOURCES
      ),
      where(
        "organisationId",
        "==",
        organisationId
      )
    );

    const snapshot =
      await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },
};
