$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"
Set-Location -LiteralPath $ProjectRoot

function Ensure-Dir($Path) {
  if (!(Test-Path -LiteralPath $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
  }
}

function Write-Utf8($Path, $Content) {
  $FullPath = Join-Path $ProjectRoot $Path
  $Dir = Split-Path $FullPath -Parent
  Ensure-Dir $Dir

  if (Test-Path -LiteralPath $FullPath) {
    $BackupDir = Join-Path $ProjectRoot "backup\queue-retry-dlq"
    Ensure-Dir $BackupDir

    $SafeName = $Path
    $SafeName = $SafeName.Replace("\", "__")
    $SafeName = $SafeName.Replace("/", "__")
    $SafeName = $SafeName.Replace(":", "")

    Copy-Item -LiteralPath $FullPath -Destination (Join-Path $BackupDir "$SafeName.bak") -Force
  }

  [System.IO.File]::WriteAllText(
    $FullPath,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host "WRITTEN: $Path" -ForegroundColor Green
}

Write-Host ""
Write-Host "QUEUE + RETRY + DLQ RUNTIME" -ForegroundColor Cyan
Write-Host ""

Ensure-Dir "src\runtime\resilience"
Ensure-Dir "src\runtime\resilience\queue"
Ensure-Dir "src\runtime\resilience\retry"
Ensure-Dir "src\runtime\resilience\dlq"
Ensure-Dir "src\runtime\resilience\circuit-breaker"
Ensure-Dir "src\runtime\resilience\worker"
Ensure-Dir "src\components\erp\resilience"

Write-Utf8 "src\runtime\resilience\queue\ERPQueueJob.ts" @'
export type ERPQueueJobStatus =
  | "pending"
  | "running"
  | "completed"
  | "failed"
  | "dead_letter";

export type ERPQueueJob = {
  id: string;
  type: string;
  module: string;
  payload?: Record<string, unknown>;
  attempts: number;
  maxAttempts: number;
  status: ERPQueueJobStatus;
  createdAt: string;
  updatedAt: string;
  error?: string;
};
'@

Write-Utf8 "src\runtime\resilience\queue\ERPQueueStore.ts" @'
import type { ERPQueueJob } from "./ERPQueueJob";

class ERPQueueStoreClass {
  private jobs: ERPQueueJob[] = [];

  add(job: ERPQueueJob) {
    this.jobs.unshift(job);
    this.jobs = this.jobs.slice(0, 300);
  }

  update(id: string, patch: Partial<ERPQueueJob>) {
    this.jobs = this.jobs.map((job) =>
      job.id === id
        ? {
            ...job,
            ...patch,
            updatedAt: new Date().toISOString(),
          }
        : job
    );
  }

  all() {
    return this.jobs;
  }

  pending() {
    return this.jobs.filter((job) => job.status === "pending");
  }

  byStatus(status: ERPQueueJob["status"]) {
    return this.jobs.filter((job) => job.status === status);
  }
}

export const ERPQueueStore = new ERPQueueStoreClass();
'@

Write-Utf8 "src\runtime\resilience\retry\ERPRetryPolicy.ts" @'
export type ERPRetryPolicy = {
  maxAttempts: number;
  baseDelayMs: number;
  backoffFactor: number;
};

export const DefaultERPRetryPolicy: ERPRetryPolicy = {
  maxAttempts: 3,
  baseDelayMs: 250,
  backoffFactor: 2,
};

export function computeRetryDelay(
  attempt: number,
  policy: ERPRetryPolicy = DefaultERPRetryPolicy
) {
  return policy.baseDelayMs * Math.pow(policy.backoffFactor, Math.max(0, attempt - 1));
}
'@

Write-Utf8 "src\runtime\resilience\dlq\ERPDeadLetterStore.ts" @'
import type { ERPQueueJob } from "../queue/ERPQueueJob";

class ERPDeadLetterStoreClass {
  private jobs: ERPQueueJob[] = [];

  add(job: ERPQueueJob) {
    this.jobs.unshift({
      ...job,
      status: "dead_letter",
      updatedAt: new Date().toISOString(),
    });

    this.jobs = this.jobs.slice(0, 200);
  }

  all() {
    return this.jobs;
  }
}

export const ERPDeadLetterStore = new ERPDeadLetterStoreClass();
'@

Write-Utf8 "src\runtime\resilience\circuit-breaker\ERPCircuitBreaker.ts" @'
export type ERPCircuitBreakerState =
  | "closed"
  | "open"
  | "half_open";

class ERPCircuitBreakerClass {
  private state: ERPCircuitBreakerState = "closed";
  private failures = 0;
  private threshold = 5;

  recordSuccess() {
    this.failures = 0;
    this.state = "closed";
  }

  recordFailure() {
    this.failures += 1;

    if (this.failures >= this.threshold) {
      this.state = "open";
    }
  }

  currentState() {
    return this.state;
  }

  canExecute() {
    return this.state !== "open";
  }

  reset() {
    this.failures = 0;
    this.state = "closed";
  }
}

export const ERPCircuitBreaker = new ERPCircuitBreakerClass();
'@

Write-Utf8 "src\runtime\resilience\worker\ERPQueueWorker.ts" @'
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
'@

Write-Utf8 "src\runtime\resilience\ERPRuntimeResilienceSeed.ts" @'
import { ERPQueueWorker } from "./worker/ERPQueueWorker";

let seeded = false;

export function seedERPRuntimeResilience() {
  if (seeded) {
    return;
  }

  seeded = true;

  ERPQueueWorker.enqueue({
    type: "STOCK_REPLENISHMENT",
    module: "stocks",
    maxAttempts: 3,
    payload: {
      product: "ENGRAIS-001",
    },
  });

  ERPQueueWorker.enqueue({
    type: "PAYMENT_RETRY",
    module: "paiements",
    maxAttempts: 2,
    payload: {
      reference: "PAY-001",
      forceFailure: true,
    },
  });

  ERPQueueWorker.enqueue({
    type: "MAINTENANCE_NOTIFICATION",
    module: "maintenance",
    maxAttempts: 3,
    payload: {
      priority: "critical",
    },
  });

  ERPQueueWorker.processAll(10);
}
'@

Write-Utf8 "src\runtime\resilience\index.ts" @'
export * from "./queue/ERPQueueJob";
export * from "./queue/ERPQueueStore";
export * from "./retry/ERPRetryPolicy";
export * from "./dlq/ERPDeadLetterStore";
export * from "./circuit-breaker/ERPCircuitBreaker";
export * from "./worker/ERPQueueWorker";
export * from "./ERPRuntimeResilienceSeed";
'@

Write-Utf8 "src\components\erp\resilience\ERPResilienceMetrics.tsx" @'
import { ERPStatCard } from "@/components/erp/ui";
import {
  ERPQueueStore,
  ERPDeadLetterStore,
  ERPCircuitBreaker,
} from "@/runtime/resilience";

export function ERPResilienceMetrics() {
  const jobs = ERPQueueStore.all();
  const completed = ERPQueueStore.byStatus("completed");
  const pending = ERPQueueStore.byStatus("pending");
  const running = ERPQueueStore.byStatus("running");
  const dlq = ERPDeadLetterStore.all();

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
      <ERPStatCard label="Jobs" value={jobs.length} helper="Total queue" />
      <ERPStatCard label="Pending" value={pending.length} helper="En attente" />
      <ERPStatCard label="Running" value={running.length} helper="En cours" />
      <ERPStatCard label="Completed" value={completed.length} helper="Termines" />
      <ERPStatCard label="DLQ" value={dlq.length} helper="Echecs isoles" />
      <ERPStatCard label="Circuit" value={ERPCircuitBreaker.currentState()} helper="Etat resilience" />
      <ERPStatCard label="Retries" value={jobs.reduce((total, job) => total + job.attempts, 0)} helper="Tentatives" />
      <ERPStatCard label="Runtime" value="Actif" helper="Worker simulation" />
    </div>
  );
}
'@

Write-Utf8 "src\components\erp\resilience\ERPQueuePanel.tsx" @'
import { ERPSection } from "@/components/erp/ui";
import { ERPQueueStore } from "@/runtime/resilience";

export function ERPQueuePanel() {
  const jobs = ERPQueueStore.all();

  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Queue runtime
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Jobs asynchrones traites par le runtime ERP.
        </p>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">{job.type}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {job.module} - attempts: {job.attempts}/{job.maxAttempts}
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {job.status}
              </span>
            </div>

            {job.error && (
              <p className="mt-3 text-sm text-red-600">
                {job.error}
              </p>
            )}
          </div>
        ))}
      </div>
    </ERPSection>
  );
}
'@

Write-Utf8 "src\components\erp\resilience\ERPDLQPanel.tsx" @'
import { ERPSection, ERPEmptyState } from "@/components/erp/ui";
import { ERPDeadLetterStore } from "@/runtime/resilience";

export function ERPDLQPanel() {
  const jobs = ERPDeadLetterStore.all();

  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Dead Letter Queue
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Jobs en echec isoles pour analyse.
        </p>
      </div>

      {jobs.length === 0 ? (
        <ERPEmptyState
          title="Aucune DLQ"
          description="Aucun job bloque pour le moment."
        />
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="rounded-2xl border border-red-200 bg-red-50 p-5"
            >
              <p className="font-semibold text-red-900">{job.type}</p>
              <p className="mt-1 text-sm text-red-700">
                {job.module} - {job.error}
              </p>
            </div>
          ))}
        </div>
      )}
    </ERPSection>
  );
}
'@

Write-Utf8 "src\components\erp\resilience\ERPRuntimeResilienceDashboard.tsx" @'
import { ERPPageHeader } from "@/components/erp/ui";
import { seedERPRuntimeResilience } from "@/runtime/resilience";

import { ERPResilienceMetrics } from "./ERPResilienceMetrics";
import { ERPQueuePanel } from "./ERPQueuePanel";
import { ERPDLQPanel } from "./ERPDLQPanel";

seedERPRuntimeResilience();

export function ERPRuntimeResilienceDashboard() {
  return (
    <div className="space-y-8">
      <ERPPageHeader
        eyebrow="ERP Resilience"
        title="Queue, Retry & DLQ Runtime"
        description="Supervision des jobs asynchrones, reprises, echecs isoles et circuit breaker ERP."
      />

      <ERPResilienceMetrics />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ERPQueuePanel />
        <ERPDLQPanel />
      </div>
    </div>
  );
}
'@

Write-Utf8 "src\components\erp\resilience\index.ts" @'
export * from "./ERPResilienceMetrics";
export * from "./ERPQueuePanel";
export * from "./ERPDLQPanel";
export * from "./ERPRuntimeResilienceDashboard";
'@

Write-Utf8 "src\app\(private)\resilience\page.tsx" @'
import { ERPRuntimeResilienceDashboard } from "@/components/erp/resilience";

export default function Page() {
  return <ERPRuntimeResilienceDashboard />;
}
'@

Write-Host ""
Write-Host "QUEUE + RETRY + DLQ RUNTIME INSTALLE" -ForegroundColor Green
Write-Host "Executer : pnpm build" -ForegroundColor Yellow