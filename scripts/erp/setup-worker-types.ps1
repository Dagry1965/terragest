























































































































Write-Host "=== TERRAGEST_V2 - SETUP ERP WORKER TYPES ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/core/workers" | Out-Null

@'
import {
  ERPJob,
} from "@/core/jobs/job-queue";

export type ERPWorkerType =
  | "workflow"
  | "notification"
  | "analytics"
  | "maintenance"
  | "export";

export type ERPWorker = {
  type: ERPWorkerType;

  execute: (
    job: ERPJob
  ) => Promise<void>;
};

const workers:
  ERPWorker[] = [];

export function registerWorker(
  worker: ERPWorker
) {
  workers.push(worker);
}

export function getWorker(
  type: ERPWorkerType
) {
  return workers.find(
    (worker) =>
      worker.type === type
  );
}
'@ | Set-Content "src/core/workers/worker-registry.ts"

@'
import {
  ERPJob,
} from "@/core/jobs/job-queue";

import {
  pushRuntimeEntry,
} from "@/core/runtime/runtime-timeline";

export async function executeWorkflowWorker(
  job: ERPJob
) {
  pushRuntimeEntry({
    module: job.module,
    action: "workflow-worker",
    type: "workflow",
    status: "success",
    entityId:
      job.payload?.id,
    message:
      `Workflow worker exécuté : ${job.name}`,
  });

  console.log(
    "WORKFLOW WORKER",
    job
  );
}
'@ | Set-Content "src/core/workers/workflow-worker.ts"

@'
import {
  ERPJob,
} from "@/core/jobs/job-queue";

import {
  pushRuntimeEntry,
} from "@/core/runtime/runtime-timeline";

export async function executeNotificationWorker(
  job: ERPJob
) {
  pushRuntimeEntry({
    module: job.module,
    action: "notification-worker",
    type: "event",
    status: "success",
    entityId:
      job.payload?.id,
    message:
      `Notification envoyée : ${job.name}`,
  });

  console.log(
    "NOTIFICATION WORKER",
    job
  );
}
'@ | Set-Content "src/core/workers/notification-worker.ts"

@'
import {
  ERPJob,
} from "@/core/jobs/job-queue";

import {
  pushRuntimeEntry,
} from "@/core/runtime/runtime-timeline";

export async function executeAnalyticsWorker(
  job: ERPJob
) {
  pushRuntimeEntry({
    module: job.module,
    action: "analytics-worker",
    type: "workflow",
    status: "success",
    entityId:
      job.payload?.id,
    message:
      `Analytics worker exécuté : ${job.name}`,
  });

  console.log(
    "ANALYTICS WORKER",
    job
  );
}
'@ | Set-Content "src/core/workers/analytics-worker.ts"

@'
import {
  ERPJob,
} from "@/core/jobs/job-queue";

import {
  pushRuntimeEntry,
} from "@/core/runtime/runtime-timeline";

export async function executeMaintenanceWorker(
  job: ERPJob
) {
  pushRuntimeEntry({
    module: job.module,
    action: "maintenance-worker",
    type: "workflow",
    status: "warning",
    entityId:
      job.payload?.id,
    message:
      `Maintenance worker exécuté : ${job.name}`,
  });

  console.log(
    "MAINTENANCE WORKER",
    job
  );
}
'@ | Set-Content "src/core/workers/maintenance-worker.ts"

@'
import {
  ERPJob,
} from "@/core/jobs/job-queue";

import {
  pushRuntimeEntry,
} from "@/core/runtime/runtime-timeline";

export async function executeExportWorker(
  job: ERPJob
) {
  pushRuntimeEntry({
    module: job.module,
    action: "export-worker",
    type: "workflow",
    status: "success",
    entityId:
      job.payload?.id,
    message:
      `Export worker exécuté : ${job.name}`,
  });

  console.log(
    "EXPORT WORKER",
    job
  );
}
'@ | Set-Content "src/core/workers/export-worker.ts"

@'
import {
  registerWorker,
} from "@/core/workers/worker-registry";

import {
  executeWorkflowWorker,
} from "@/core/workers/workflow-worker";

import {
  executeNotificationWorker,
} from "@/core/workers/notification-worker";

import {
  executeAnalyticsWorker,
} from "@/core/workers/analytics-worker";

import {
  executeMaintenanceWorker,
} from "@/core/workers/maintenance-worker";

import {
  executeExportWorker,
} from "@/core/workers/export-worker";

registerWorker({
  type: "workflow",
  execute:
    executeWorkflowWorker,
});

registerWorker({
  type: "notification",
  execute:
    executeNotificationWorker,
});

registerWorker({
  type: "analytics",
  execute:
    executeAnalyticsWorker,
});

registerWorker({
  type: "maintenance",
  execute:
    executeMaintenanceWorker,
});

registerWorker({
  type: "export",
  execute:
    executeExportWorker,
});
'@ | Set-Content "src/core/workers/register-workers.ts"

Write-Host "=== ERP WORKER TYPES créés avec succès ===" -ForegroundColor Green

















