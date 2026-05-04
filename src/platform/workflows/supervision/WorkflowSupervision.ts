// src/platform/workflows/supervision/WorkflowSupervision.ts

import { WorkflowStateStore }
from "@/platform/workflows/store/WorkflowStateStore";

class WorkflowSupervisionManager {

  printState(
    entityId: string
  ) {

    const state =
      WorkflowStateStore
        .getState(
          entityId
        );

    console.log(
      "[WORKFLOW STATE]",
      entityId,
      state
    );
  }
}

export const WorkflowSupervision =
  new WorkflowSupervisionManager();
