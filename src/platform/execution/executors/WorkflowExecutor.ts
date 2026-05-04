// src/platform/execution/executors/WorkflowExecutor.ts

import { WorkflowQueue }
from "@/platform/execution/queue/WorkflowQueue";

import { WorkflowThrottler }
from "@/platform/throttling/WorkflowThrottler";

import { RetryPolicy }
from "@/platform/resilience/RetryPolicy";

import { DeadLetterQueue }
from "@/platform/resilience/DeadLetterQueue";

import { CircuitBreaker }
from "@/platform/circuit-breaker/CircuitBreaker";

const workflowCircuitBreaker =
  new CircuitBreaker(3);

export class WorkflowExecutor {

  static async runNext() {

    if (
      !WorkflowThrottler.canExecute()
    ) {

      console.warn(
        "[THROTTLER] limit reached"
      );

      return;
    }

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

    WorkflowThrottler
      .startExecution();

    try {

      await workflowCircuitBreaker.execute(
        async () => {

          await RetryPolicy.execute(
            async () => {

              await Promise.resolve();
            }
          );
        }
      );

    } catch (error) {

      DeadLetterQueue.add({

        workflow: job.workflow,

        error,

        timestamp: new Date()
      });

    } finally {

      WorkflowThrottler
        .finishExecution();
    }
  }
}