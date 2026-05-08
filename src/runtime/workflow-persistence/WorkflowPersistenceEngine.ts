import { db }
from "@/infrastructure/firebase/firebase";

import {
  addDoc,
  collection,
  serverTimestamp,
}
from "firebase/firestore";

import {
  WorkflowHistoryEntry,
}
from "@/runtime/workflow-persistence/WorkflowHistoryEntry";

export class WorkflowPersistenceEngine {

  static async persistTransition(

    entry:
      WorkflowHistoryEntry

  ) {

    await addDoc(

      collection(
        db,
        "workflow_history"
      ),

      {

        ...entry,

        createdAt:
          serverTimestamp(),
      }
    );
  }
}
