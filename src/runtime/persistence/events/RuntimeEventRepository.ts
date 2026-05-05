import {
  collection,
  addDoc,
  getDocs
}
from "firebase/firestore";

import { db }
from "../../../lib/firebase";

export class
RuntimeEventRepository {

  async append(
    payload: unknown
  ) {

    return addDoc(
      collection(
        db,
        "runtime_events"
      ),
      {
        payload,
        createdAt:
          Date.now(),
      }
    );
  }

  async getAll() {

    const snapshot =
      await getDocs(
        collection(
          db,
          "runtime_events"
        )
      );

    return snapshot.docs.map(
      doc => ({
        id: doc.id,
        ...doc.data(),
      })
    );
  }
}
