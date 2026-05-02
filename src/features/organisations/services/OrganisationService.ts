import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

export const OrganisationService = {

  async create(data: any) {

    return addDoc(
      collection(
        db,
        "organisations"
      ),
      data
    );
  },

  async getAll() {

    const snapshot =
      await getDocs(
        collection(
          db,
          "organisations"
        )
      );

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async getById(id: string) {

    const snapshot =
      await getDoc(
        doc(
          db,
          "organisations",
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
        "organisations",
        id
      ),
      data
    );
  },
};
