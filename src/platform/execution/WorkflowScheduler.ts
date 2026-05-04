// src/platform/execution/WorkflowScheduler.ts

import { WorkflowExecutor }
from "@/platform/execution/executors/WorkflowExecutor";

export class WorkflowScheduler {

  static start() {

    console.log(
      "[SCHEDULER] started"
    );

    setInterval(
      async () => {

        await WorkflowExecutor
          .runNext();

      },
      5000
    );
  }
}