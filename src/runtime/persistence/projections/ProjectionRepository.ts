import {
  collection,
  addDoc
}
from "firebase/firestore";

import { db }
from "../../../lib/firebase";

export class ProjectionRepository {

  async save(
    projection: unknown
  ) {

    return addDoc(
      collection(
        db,
        "runtime_projections"
      ),
      {
        projection,
        createdAt:
          Date.now(),
      }
    );
  }
}
