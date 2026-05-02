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

import { Intervention }
from "../../types/Intervention";

const COLLECTION =
  "interventions";

export class
FirestoreInterventionRepository {

  static async create(
    data: Intervention
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
          item.data() as Intervention;

        return {

          ...data,

          id: item.id,
        };
      }
    );
  }

  static async getById(
    id: string
  ): Promise<Intervention | null> {

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
      snapshot.data() as Intervention;

    return {

      ...data,

      id: snapshot.id,
    };
  }

  static async update(

    id: string,

    data: Partial<Intervention>

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