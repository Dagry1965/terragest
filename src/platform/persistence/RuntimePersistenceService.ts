// src/platform/persistence/RuntimePersistenceService.ts

import { WorkflowQueue }
from "@/platform/execution/queue/WorkflowQueue";

import { RuntimeSnapshotStore }
from "@/platform/persistence/RuntimeSnapshotStore";

export class RuntimePersistenceService {

  static saveSnapshot() {

    RuntimeSnapshotStore.save({

      timestamp: new Date(),

      jobs:
        WorkflowQueue.getJobs()
    });
  }

  static restoreLatestSnapshot() {

    const snapshot =
      RuntimeSnapshotStore
        .getLatestSnapshot();

    if (!snapshot) {

      console.log(
        "[RESTORE] no snapshot found"
      );

      return;
    }

    console.log(
      "[RESTORE] snapshot restored",
      snapshot.timestamp
    );
  }
}