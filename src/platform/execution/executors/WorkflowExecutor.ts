// src/platform/execution/executors/WorkflowExecutor.ts

import { WorkflowQueue }
from "@/platform/execution/queue/WorkflowQueue";

export class WorkflowExecutor {

  static async runNext() {

    const job =
      WorkflowQueue.dequeue();

    if (!job) {

      console.log(
        "[EXECUTOR] no jobs"
      );

      return;
    }

    console.log(
      "[EXECUTOR] running",
      job.workflow
    );

    await Promise.resolve();
  }
}