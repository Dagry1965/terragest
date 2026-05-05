// src/infrastructure/repositories/firestore/BaseFirestoreRepository.ts

import {

  addDoc,

  collection,

  doc,

  getDoc,

  getDocs,

  updateDoc
}
from "firebase/firestore";

import { db }
from "@/infrastructure/firebase/firebase";

export class BaseFirestoreRepository<T> {

  constructor(

    private collectionName:
      string
  ) {}

  async create(
    data: T
  ) {

    return addDoc(

      collection(
        db,
        this.collectionName
      ),

      data as object
    );
  }

  async findAll() {

    const snapshot =
      await getDocs(

        collection(
          db,
          this.collectionName
        )
      );

    return snapshot.docs.map(
      doc => ({

        id:
          doc.id,

        ...doc.data()
      })
    );
  }

  async findById(
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

      ...snapshot.data()
    };
  }

  async update(

    id: string,

    data: Partial<T>
  ) {

    await updateDoc(

      doc(
        db,
        this.collectionName,
        id
      ),

      data as object
    );
  }
}
