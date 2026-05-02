import {

  collection,

  addDoc,

  getDocs,

  getDoc,

  updateDoc,

  deleteDoc,

  doc

} from "firebase/firestore";

import {

  db

} from "@/lib/firebase/firebase";

const COLLECTION =
  "mouvements_stock";

export const
FirestoreStockRepository = {

  async create(
    data: any
  ) {

    return addDoc(

      collection(
        db,
        COLLECTION
      ),

      data
    );
  },

  async getAll() {

    const snapshot =

      await getDocs(

        collection(
          db,
          COLLECTION
        )
      );

    return snapshot.docs.map(

      (item) => ({

        id: item.id,

        ...item.data(),
      })
    );
  },

  async getById(
    id: string
  ) {

    const snapshot =

      await getDoc(

        doc(
          db,
          COLLECTION,
          id
        )
      );

    if (
      !snapshot.exists()
    ) {

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
        COLLECTION,
        id
      ),

      data
    );
  },

  async delete(
    id: string
  ) {

    return deleteDoc(

      doc(
        db,
        COLLECTION,
        id
      )
    );
  },
};