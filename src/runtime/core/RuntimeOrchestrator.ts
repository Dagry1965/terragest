import {
  runtimeEventBus,
} from "./RuntimeEventBus";

import {
  runtimeExecutionRegistry,
} from "./RuntimeExecutionRegistry";

import {
  runtimeQueueRegistry,
} from "./RuntimeQueueRegistry";

import {
  runtimeRetryRegistry,
} from "./RuntimeRetryRegistry";

import {
  runtimeDeadLetterQueue,
} from "./RuntimeDeadLetterQueue";

export class RuntimeOrchestrator {

  executeWorkflow(
    moduleId: string,
    workflow: string,
    payload?: unknown
  ) {

    const executionId =
      crypto.randomUUID();

    runtimeExecutionRegistry.startExecution({
      executionId,
      moduleId,
      workflow,
      status: "running",
      startedAt:
        new Date().toISOString(),
    });

    runtimeEventBus.emit({
      name: "workflow.started",
      payload: {
        moduleId,
        workflow,
        payload,
      },
      emittedBy: moduleId,
      createdAt:
        new Date().toISOString(),
    });

    return executionId;
  }

  enqueueJob(
    queue: string,
    payload?: unknown
  ) {

    runtimeQueueRegistry.enqueue({
      id: crypto.randomUUID(),
      queue,
      payload,
      status: "pending",
      createdAt:
        new Date().toISOString(),
    });
  }

  retryJob(
    jobId: string
  ) {

    runtimeRetryRegistry.registerRetry({
      jobId,
      retries: 1,
      status: "retrying",
      lastRetryAt:
        new Date().toISOString(),
    });
  }

  pushDeadLetter(
    event: string,
    reason: string,
    payload?: unknown
  ) {

    runtimeDeadLetterQueue.push({
      id: crypto.randomUUID(),
      event,
      payload,
      reason,
      failedAt:
        new Date().toISOString(),
    });
  }
}

export const runtimeOrchestrator =
  new RuntimeOrchestrator();