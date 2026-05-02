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

import { MOUVEMENT_STOCK }
from "../../types/MOUVEMENT_STOCK";

const COLLECTION =
  "mouvements_stock";

export class
FirestoreStockRepository {

  static async create(
    data: MOUVEMENT_STOCK
  ) {

    return addDoc(
      collection(
        db,
        COLLECTION
      ),
      data as any
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
          item.data() as Record<
            string,
            any
          >;

        return {

          ...data,

          id: item.id,
        };
      }
    );
  }

  static async getById(
    id: string
  ): Promise<any> {

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
      snapshot.data() as Record<
        string,
        any
      >;

    return {

      ...data,

      id: snapshot.id,
    };
  }

  static async update(

    id: string,

    data: Partial<MOUVEMENT_STOCK>

  ) {

    await updateDoc(

      doc(
        db,
        COLLECTION,
        id
      ),

      data as any
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