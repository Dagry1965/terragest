// src/platform/persistence/RuntimeSnapshotStore.ts

import {
  WorkflowJob
}
from "@/platform/execution/queue/WorkflowQueue";

export interface RuntimeSnapshot {

  timestamp: Date;

  jobs: WorkflowJob[];
}

class RuntimeSnapshotStoreManager {

  private snapshots:
    RuntimeSnapshot[] = [];

  save(
    snapshot: RuntimeSnapshot
  ) {

    console.log(
      "[SNAPSHOT SAVED]",
      snapshot.timestamp
    );

    this.snapshots.push(
      snapshot
    );
  }

  getSnapshots() {

    return this.snapshots;
  }

  getLatestSnapshot() {

    return this.snapshots.at(-1);
  }
}

export const RuntimeSnapshotStore =
  new RuntimeSnapshotStoreManager();