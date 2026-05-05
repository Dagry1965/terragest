import {
  collection,
  addDoc
}
from "firebase/firestore";

import { db }
from "../../../lib/firebase";

export class WorkflowRepository {

  async save(
    workflow: unknown
  ) {

    return addDoc(
      collection(
        db,
        "runtime_workflows"
      ),
      {
        workflow,
        createdAt:
          Date.now(),
      }
    );
  }
}
