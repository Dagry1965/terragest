// src/platform/scheduling/WorkflowSchedulerPolicy.ts

import { WorkflowPriority }
from "@/platform/scheduling/WorkflowPriority";

export class WorkflowSchedulerPolicy {

  static resolvePriority(
    workflow: string
  ) {

    if (
      workflow.includes(
        "critical"
      )
    ) {

      return WorkflowPriority
        .CRITICAL;
    }

    if (
      workflow.includes(
        "paiement"
      )
    ) {

      return WorkflowPriority
        .HIGH;
    }

    return WorkflowPriority
      .MEDIUM;
  }
}