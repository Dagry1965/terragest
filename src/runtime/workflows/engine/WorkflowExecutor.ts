import type {
  WorkflowDefinition
}
from "../types/WorkflowDefinition";

import {
  WorkflowStateStore
}
from "../state/WorkflowStateStore";

import {
  workflowExecutionStore
}
from "@/features/observability/stores/workflows/workflowExecutionStore";

import {
  WorkflowExecutionPersistence
}
from "../persistence/WorkflowExecutionPersistence";

import {
  RetryEngine
}
from "@/runtime/resilience/retry/RetryEngine";

import {
  DeadLetterQueue
}
from "@/runtime/resilience/dlq/DeadLetterQueue";

export class WorkflowExecutor {

  private store =
    new WorkflowStateStore();

  private persistence =
    new WorkflowExecutionPersistence();

  private retryEngine =
    new RetryEngine();

  private deadLetterQueue =
    new DeadLetterQueue();

  async execute(
    workflow: WorkflowDefinition,
    payload?: unknown
  ) {

    const execution = {
      workflowId:
        workflow.id,

      status:
        "RUNNING" as const,

      startedAt:
        Date.now(),
    };

    this.store.add(
      execution
    );

    workflowExecutionStore.push(
      execution
    );

    const documentId =
      await this.persistence.create(
        execution
      );

    try {

      for (const step of workflow.steps) {

        const runningUpdate = {
          currentStep:
            step.name,

          status:
            "RUNNING" as const,
        };

        this.store.update(
          workflow.id,
          runningUpdate
        );

        workflowExecutionStore.push({
          ...execution,
          ...runningUpdate,
        });

        await this.persistence.update(
          documentId,
          runningUpdate
        );

        await this.retryEngine.execute(

          async () => {

            await step.execute(
              payload
            );
          },

          {
            maxAttempts:
              3,

            delayMs:
              500,
          }
        );
      }

      const completedUpdate = {
        status:
          "COMPLETED" as const,

        finishedAt:
          Date.now(),
      };

      this.store.update(
        workflow.id,
        completedUpdate
      );

      workflowExecutionStore.push({
        ...execution,
        ...completedUpdate,
      });

      await this.persistence.update(
        documentId,
        completedUpdate
      );

    } catch (error) {

      const failedUpdate = {
        status:
          "FAILED" as const,

        error:
          String(error),

        finishedAt:
          Date.now(),
      };

      this.store.update(
        workflow.id,
        failedUpdate
      );

      workflowExecutionStore.push({
        ...execution,
        ...failedUpdate,
      });

      await this.persistence.update(
        documentId,
        failedUpdate
      );

      await this.deadLetterQueue.store({

        type:
          workflow.id,

        source:
          "workflow-runtime",

        payload,

        error:
          String(error),
      });

      throw error;
    }
  }

  getExecutions() {

    return this.store.getAll();
  }
}