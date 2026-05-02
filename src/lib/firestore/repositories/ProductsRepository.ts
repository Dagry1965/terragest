import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  db,
} from "@/lib/firebase/firebase";

const COLLECTION =
"products";

export const ProductsRepository = {

  async create(
    payload: any
  ) {

    return addDoc(
      collection(
        db,
        COLLECTION
      ),
      payload
    );
  },

  async update(
    id: string,
    payload: any
  ) {

    return updateDoc(
      doc(
        db,
        COLLECTION,
        id
      ),
      payload
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
