import {
  collection,
  addDoc
}
from "firebase/firestore";

import { db }
from "../../../lib/firebase";

export class ProcessRepository {

  async save(
    process: unknown
  ) {

    return addDoc(
      collection(
        db,
        "runtime_processes"
      ),
      {
        process,
        createdAt:
          Date.now(),
      }
    );
  }
}
