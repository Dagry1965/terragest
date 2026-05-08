import {
  ERPEventBus,
} from "@/runtime/events/bus/ERPEventBus";

import {
  ERPTraceStore,
  ERPAlertStore,
} from "@/runtime/observability";

import {
  ERPQueueStore,
} from "../queue/ERPQueueStore";

import {
  ERPDeadLetterStore,
} from "../dlq/ERPDeadLetterStore";

import {
  ERPCircuitBreaker,
} from "../circuit-breaker/ERPCircuitBreaker";

import type {
  ERPQueueJob,
} from "../queue/ERPQueueJob";

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function shouldFail(job: ERPQueueJob) {
  return Boolean(job.payload?.forceFailure);
}

export const ERPQueueWorker = {
  enqueue(
    input: Omit<
      ERPQueueJob,
      "id" | "attempts" | "status" | "createdAt" | "updatedAt"
    >
  ) {
    const now = new Date().toISOString();

    const job: ERPQueueJob = {
      ...input,
      id: createId("queue_job"),
      attempts: 0,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    };

    ERPQueueStore.add(job);

    ERPEventBus.emit({
      id: createId("evt_queue"),
      type: "AUTOMATION_TRIGGERED",
      module: job.module,
      timestamp: now,
      actor: "queue-runtime",
      payload: {
        jobId: job.id,
        jobType: job.type,
      },
    });

    return job;
  },

  processNext() {
    if (!ERPCircuitBreaker.canExecute()) {
      ERPAlertStore.add({
        id: createId("alert_circuit"),
        module: "runtime",
        title: "Circuit breaker ouvert",
        description: "Le worker runtime est temporairement bloque.",
        level: "critical",
        timestamp: new Date().toISOString(),
      });

      return;
    }

    const job = ERPQueueStore.pending()[0];

    if (!job) {
      return;
    }

    const startedAt = Date.now();

    ERPQueueStore.update(job.id, {
      status: "running",
      attempts: job.attempts + 1,
    });

    const nextAttempt = job.attempts + 1;

    try {
      if (shouldFail(job)) {
        throw new Error("Forced runtime failure");
      }

      ERPQueueStore.update(job.id, {
        status: "completed",
      });

      ERPCircuitBreaker.recordSuccess();

      ERPTraceStore.add({
        traceId: createId("trace_queue"),
        module: job.module,
        action: `QUEUE_COMPLETED:${job.type}`,
        status: "success",
        duration: Date.now() - startedAt,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown queue error";

      if (nextAttempt >= job.maxAttempts) {
        const failedJob: ERPQueueJob = {
          ...job,
          attempts: nextAttempt,
          status: "dead_letter",
          error: message,
          updatedAt: new Date().toISOString(),
        };

        ERPQueueStore.update(job.id, failedJob);
        ERPDeadLetterStore.add(failedJob);
        ERPCircuitBreaker.recordFailure();

        ERPAlertStore.add({
          id: createId("alert_dlq"),
          module: job.module,
          title: "Job envoye en DLQ",
          description: message,
          level: "critical",
          timestamp: new Date().toISOString(),
        });
      } else {
        ERPQueueStore.update(job.id, {
          status: "pending",
          attempts: nextAttempt,
          error: message,
        });

        ERPCircuitBreaker.recordFailure();

        ERPTraceStore.add({
          traceId: createId("trace_retry"),
          module: job.module,
          action: `QUEUE_RETRY:${job.type}`,
          status: "warning",
          duration: Date.now() - startedAt,
          timestamp: new Date().toISOString(),
          metadata: {
            attempt: nextAttempt,
          },
        });
      }
    }
  },

  processAll(limit = 10) {
    for (let index = 0; index < limit; index += 1) {
      this.processNext();
    }
  },
};