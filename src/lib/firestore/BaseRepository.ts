import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import { db }
from "@/lib/firebase/config";

export class BaseRepository<T> {

  constructor(
    protected collectionName: string
  ) {}

  async create(data: T) {

    return await addDoc(
      collection(
        db,
        this.collectionName
      ),
      {
        ...data,
        createdAt:
          new Date().toISOString(),

        updatedAt:
          new Date().toISOString(),
      }
    );
  }

  async update(
    id: string,
    data: Partial<T>
  ) {

    return await updateDoc(
      doc(
        db,
        this.collectionName,
        id
      ),
      {
        ...data,
        updatedAt:
          new Date().toISOString(),
      }
    );
  }

  async delete(id: string) {

    return await deleteDoc(
      doc(
        db,
        this.collectionName,
        id
      )
    );
  }

  async getById(id: string) {

    const snapshot =
      await getDoc(
        doc(
          db,
          this.collectionName,
          id
        )
      );

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
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

  subscribe(
    callback: (data: any[]) => void
  ) {

    return onSnapshot(
      collection(
        db,
        this.collectionName
      ),
      (snapshot) => {

        callback(
          snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          )
        );
      }
    );
  }
}