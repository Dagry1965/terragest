import {
  collection,
  addDoc
}
from "firebase/firestore";

import { db }
from "../../../lib/firebase";

export class AnalyticsRepository {

  async save(
    analytics: unknown
  ) {

    return addDoc(
      collection(
        db,
        "runtime_analytics"
      ),
      {
        analytics,
        createdAt:
          Date.now(),
      }
    );
  }
}
