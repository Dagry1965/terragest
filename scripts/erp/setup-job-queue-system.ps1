Write-Host "=== TERRAGEST_V2 - SETUP ERP JOB QUEUE SYSTEM ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/core/jobs" | Out-Null

@'
export type ERPJobPriority =
  | "low"
  | "normal"
  | "critical";

export type ERPJob = {
  id: string;

  name: string;

  module: string;

  payload?: any;

  priority: ERPJobPriority;

  status:
    | "pending"
    | "running"
    | "completed"
    | "failed";

  retries: number;

  createdAt: string;
};

const jobQueue:
  ERPJob[] = [];

export function enqueueJob(
  job: Omit<
    ERPJob,
    "id" |
    "status" |
    "retries" |
    "createdAt"
  >
) {
  const runtimeJob:
    ERPJob = {
      id:
        `JOB-${Date.now()}-${Math.random()}`,

      status: "pending",

      retries: 0,

      createdAt:
        new Date().toISOString(),

      ...job,
    };

  jobQueue.push(runtimeJob);

  console.log(
    "ERP JOB ENQUEUED",
    runtimeJob
  );

  return runtimeJob;
}

export function getJobQueue() {
  return jobQueue;
}

export function getPendingJobs() {
  return jobQueue.filter(
    (job) =>
      job.status === "pending"
  );
}
'@ | Set-Content "src/core/jobs/job-queue.ts"

@'
import {
  ERPJob,
} from "@/core/jobs/job-queue";

import {
  pushRuntimeEntry,
} from "@/core/runtime/runtime-timeline";

export async function executeJob(
  job: ERPJob
) {
  console.log(
    "ERP JOB EXECUTION",
    job
  );

  job.status = "running";

  pushRuntimeEntry({
    module: job.module,
    action: "job",
    type: "workflow",
    status: "success",
    entityId:
      job.payload?.id,
    message:
      `Job ${job.name} démarré`,
  });

  await new Promise(
    (resolve) =>
      setTimeout(resolve, 300)
  );

  job.status = "completed";

  pushRuntimeEntry({
    module: job.module,
    action: "job",
    type: "workflow",
    status: "success",
    entityId:
      job.payload?.id,
    message:
      `Job ${job.name} terminé`,
  });

  console.log(
    "ERP JOB COMPLETED",
    job
  );
}
'@ | Set-Content "src/core/jobs/job-worker.ts"

@'
import {
  getPendingJobs,
} from "@/core/jobs/job-queue";

import {
  executeJob,
} from "@/core/jobs/job-worker";

export async function startJobWorker() {
  console.log(
    "ERP JOB WORKER STARTED"
  );

  const pendingJobs =
    getPendingJobs();

  for (const job of pendingJobs) {
    await executeJob(job);
  }
}
'@ | Set-Content "src/core/jobs/start-worker.ts"

Write-Host "=== ERP JOB QUEUE SYSTEM créé avec succès ===" -ForegroundColor Green