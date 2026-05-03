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
from "@/lib/firebase/config";

import { Materiel }
from "../../types/Materiel";

const COLLECTION =
  "materiels";

export class
FirestoreMaterielRepository {

  static async create(
    data: Materiel
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
          item.data() as Materiel;

        return {

          ...data,

          id: item.id,
        };
      }
    );
  }

  static async getById(
    id: string
  ): Promise<Materiel | null> {

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
      snapshot.data() as Materiel;

    return {

      ...data,

      id: snapshot.id,
    };
  }

  static async update(

    id: string,

    data: Partial<Materiel>

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