import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

import { db }
from "@/lib/firebase/firebase";

import { Produit }
from "../../types/Produit";

const COLLECTION =
  "produits";

export class
FirestoreProduitRepository {

  static async create(
    data: Produit
  ) {

    return addDoc(
      collection(
        db,
        COLLECTION
      ),
      data
    );
  }

  static async getAll() {

    const snapshot =
      await getDocs(
        collection(
          db,
          COLLECTION
        )
      );

    return snapshot.docs.map(
      (item) => {

        const data =
          item.data() as Produit;

        return {

          ...data,

          id: item.id,
        };
      }
    );
  }

  static async getById(
    id: string
  ): Promise<Produit | null> {

    const snapshot =
      await getDoc(
        doc(
          db,
          COLLECTION,
          id
        )
      );

    if (!snapshot.exists()) {

      return null;
    }

    const data =
      snapshot.data() as Produit;

    return {

      ...data,

      id: snapshot.id,
    };
  }

  static async update(

    id: string,

    data: Partial<Produit>

  ) {

    await updateDoc(

      doc(
        db,
        COLLECTION,
        id
      ),

      data
    );
  }

  static async delete(
    id: string
  ) {

    await deleteDoc(

      doc(
        db,
        COLLECTION,
        id
      )
    );
  }
}