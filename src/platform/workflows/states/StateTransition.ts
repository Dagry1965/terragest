// src/platform/workflows/states/StateTransition.ts

import { WorkflowState }
from "@/platform/workflows/states/WorkflowState";

export interface StateTransition {

  from:
    WorkflowState;

  to:
    WorkflowState;
}
