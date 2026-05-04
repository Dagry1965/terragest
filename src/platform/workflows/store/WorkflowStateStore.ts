// src/platform/workflows/store/WorkflowStateStore.ts

import { WorkflowState }
from "@/platform/workflows/states/WorkflowState";

import {
  WorkflowHistoryEntry
}
from "@/platform/workflows/history/WorkflowHistoryEntry";

class WorkflowStateStoreManager {

  private states:
    Record<string, WorkflowState>
    = {};

  private history:
    WorkflowHistoryEntry[] = [];

  setState(

    entityId: string,

    state: WorkflowState
  ) {

    this.states[
      entityId
    ] = state;
  }

  getState(
    entityId: string
  ) {

    return this.states[
      entityId
    ];
  }

  addHistory(
    entry: WorkflowHistoryEntry
  ) {

    this.history.push(
      entry
    );

    console.log(
      "[WORKFLOW HISTORY]",
      entry.domain,
      entry.entityId,
      entry.to
    );
  }

  getHistory(
    entityId: string
  ) {

    return this.history.filter(
      entry =>
        entry.entityId
        === entityId
    );
  }
}

export const WorkflowStateStore =
  new WorkflowStateStoreManager();
