import { traceExecution } from "../runtime/execution-trace";

import { RetryPolicy } from "../resilience/retry-policy";

import { DeadLetterQueue } from "../resilience/dead-letter-queue";

const retryPolicy =
  new RetryPolicy();

const deadLetterQueue =
  new DeadLetterQueue();

export class RuntimeExecutor {

  execute(action: string) {

    try {

      retryPolicy.execute(() => {

        traceExecution(
          "EXECUTION",
          action
        );

        console.log(
          "[RUNTIME EXECUTION]",
          action
        );
      });

    } catch (error) {

      console.error(
        "[EXECUTION ERROR]",
        error
      );

      deadLetterQueue.capture({

        action,
        error,
        timestamp: new Date(),
      });
    }
  }
}