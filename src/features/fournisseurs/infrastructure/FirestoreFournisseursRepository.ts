import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
}
from "firebase/firestore";

import { db }
from "@/lib/firebase";

import type {
  Fournisseurs
}
from "../domain/Fournisseurs";

import type {
  FournisseursRepository
}
from "../domain/FournisseursRepository";

class FirestoreRepository
implements
  FournisseursRepository {

  private collectionName =
    "fournisseurs";

  async getAll() {

    const snapshot =
      await getDocs(
        collection(
          db,
          this.collectionName
        )
      );

    return snapshot.docs.map(
      document => ({

        id:
          document.id,

        ...document.data(),
      })
    ) as Fournisseurs[];
  }

  async getById(
    id: string
  ) {

    const snapshot =
      await getDoc(
        doc(
          db,
          this.collectionName,
          id
        )
      );

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id:
        snapshot.id,

      ...snapshot.data(),
    } as Fournisseurs;
  }

  async create(
    data:
      Partial<Fournisseurs>
  ) {

    return addDoc(

      collection(
        db,
        this.collectionName
      ),

      {
        ...data,

        createdAt:
          new Date()
            .toISOString(),
      }
    );
  }

  async update(
    id: string,
    data:
      Partial<Fournisseurs>
  ) {

    await updateDoc(

      doc(
        db,
        this.collectionName,
        id
      ),

      data
    );
  }

  async delete(
    id: string
  ) {

    await deleteDoc(

      doc(
        db,
        this.collectionName,
        id
      )
    );
  }
}

export const
FirestoreFournisseursRepository =
  new FirestoreRepository();