import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase/config";

export class BaseRepository<T> {

  collectionName: string;

  constructor(
    collectionName: string
  ) {

    this.collectionName =
      collectionName;
  }

  async create(
    data: T
  ) {

    return addDoc(
      collection(
        db,
        this.collectionName
      ),
      data as any
    );
  }

  async getAll() {

    const snapshot =
      await getDocs(
        collection(
          db,
          this.collectionName
        )
      );

    return snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );
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

    return {

      id:
        snapshot.id,

      ...snapshot.data(),
    };
  }

  async update(
    id: string,
    data: Partial<T>
  ) {

    return updateDoc(
      doc(
        db,
        this.collectionName,
        id
      ),
      data as any
    );
  }

  async delete(
    id: string
  ) {

    return deleteDoc(
      doc(
        db,
        this.collectionName,
        id
      )
    );
  }
}
