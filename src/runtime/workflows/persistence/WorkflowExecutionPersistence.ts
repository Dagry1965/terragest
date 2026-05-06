import {
  addDoc,
  collection,
  doc,
  updateDoc,
}
from "firebase/firestore";

import { db }
from "@/lib/firebase";

import type {
  WorkflowExecution
}
from "../types/WorkflowExecution";

export class
WorkflowExecutionPersistence {

  async create(
    execution:
      WorkflowExecution
  ) {

    const document =
      await addDoc(

        collection(
          db,
          "runtime_workflow_executions"
        ),

        {
          ...execution,

          createdAt:
            Date.now(),
        }
      );

    return document.id;
  }

  async update(

    documentId: string,

    partial:
      Partial<WorkflowExecution>
  ) {

    await updateDoc(

      doc(
        db,
        "runtime_workflow_executions",
        documentId
      ),

      {
        ...partial,

        updatedAt:
          Date.now(),
      }
    );
  }
}