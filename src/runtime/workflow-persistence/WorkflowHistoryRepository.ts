import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
}
from "firebase/firestore";

import { db }
from "@/infrastructure/firebase/firebase";

import type {
  WorkflowHistoryEntry,
}
from "@/runtime/workflow-persistence/WorkflowHistoryEntry";

export class WorkflowHistoryRepository {

  static async findByEntity(

    module: string,

    entityId: string

  ): Promise<WorkflowHistoryEntry[]> {

    const q =
      query(

        collection(
          db,
          "workflow_history"
        ),

        where(
          "module",
          "==",
          module
        ),

        where(
          "entityId",
          "==",
          entityId
        ),

        orderBy(
          "createdAt",
          "desc"
        )
      );

    const snapshot =
      await getDocs(q);

    return snapshot.docs.map((document) => {
      const data =
        document.data() as Record<string, unknown>;

      return {
        id: document.id,
        ...data,
      } as unknown as WorkflowHistoryEntry;
    });
  }
}