// src/platform/workflows/history/WorkflowHistoryEntry.ts

import { WorkflowState }
from "@/platform/workflows/states/WorkflowState";

export interface WorkflowHistoryEntry {

  domain: string;

  entityId: string;

  from?: WorkflowState;

  to: WorkflowState;

  timestamp: Date;

  user?: string;
}
