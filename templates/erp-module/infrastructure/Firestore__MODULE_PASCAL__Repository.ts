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
  __MODULE_PASCAL__
}
from "../domain/__MODULE_PASCAL__";

import type {
  __MODULE_PASCAL__Repository
}
from "../domain/__MODULE_PASCAL__Repository";

class FirestoreRepository
implements
  __MODULE_PASCAL__Repository {

  private collectionName =
    "__MODULE__";

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
    ) as __MODULE_PASCAL__[];
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
    } as __MODULE_PASCAL__;
  }

  async create(
    data:
      Partial<__MODULE_PASCAL__>
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
      Partial<__MODULE_PASCAL__>
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
Firestore__MODULE_PASCAL__Repository =
  new FirestoreRepository();