import {
  collection,
  addDoc
}
from "firebase/firestore";

import { db }
from "../../../lib/firebase";

export class AuditRepository {

  async save(
    audit: unknown
  ) {

    return addDoc(
      collection(
        db,
        "runtime_audit"
      ),
      {
        audit,
        createdAt:
          Date.now(),
      }
    );
  }
}
