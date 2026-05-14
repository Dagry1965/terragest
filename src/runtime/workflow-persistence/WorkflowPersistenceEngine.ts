import { db }
from "@/infrastructure/firebase/firebase";

import {
  addDoc,
  collection,
  serverTimestamp,
}
from "firebase/firestore";

import type {
  WorkflowHistoryEntry,
}
from "@/runtime/workflow-persistence/WorkflowHistoryEntry";

import {
  ERPWorkflowTimelineStore,
}
from "@/runtime/workflows/enterprise/timeline/ERPWorkflowTimelineStore";

import {
  erpRuntimeAuditTrail,
}
from "@/runtime/observability/ERPRuntimeAuditTrail";

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

    const createdAt =
      new Date().toISOString();

    ERPWorkflowTimelineStore.add({
      id: `${entry.module}-${entry.entityId}-${Date.now()}`,
      workflowKey: `${entry.module}-workflow`,
      module: entry.module,
      label: `${entry.fromState} → ${entry.toState}`,
      state: entry.toState,
      timestamp: createdAt,
    });

    erpRuntimeAuditTrail.log({
      id: `${entry.module}-${entry.entityId}-${entry.action}-${Date.now()}`,
      module: entry.module,
      action: entry.action,
      user: entry.user,
      createdAt,
      payload: {
        entityId: entry.entityId,
        fromState: entry.fromState,
        toState: entry.toState,
        comment: entry.comment,
      },
    });
  }
}