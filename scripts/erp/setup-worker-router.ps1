Write-Host "=== TERRAGEST_V2 - SETUP ERP WORKER ROUTER ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/core/router" | Out-Null

@'
import {
  ERPJob,
} from "@/core/jobs/job-queue";

import {
  getWorker,
  ERPWorkerType,
} from "@/core/workers/worker-registry";

import "@/core/workers/register-workers";

import {
  pushRuntimeEntry,
} from "@/core/runtime/runtime-timeline";

export function resolveWorkerType(
  job: ERPJob
): ERPWorkerType {
  if (
    job.name.includes(
      "maintenance"
    )
  ) {
    return "maintenance";
  }

  if (
    job.name.includes(
      "notification"
    )
  ) {
    return "notification";
  }

  if (
    job.name.includes(
      "analytics"
    )
  ) {
    return "analytics";
  }

  if (
    job.name.includes(
      "export"
    )
  ) {
    return "export";
  }

  return "workflow";
}

export async function routeJob(
  job: ERPJob
) {
  const workerType =
    resolveWorkerType(job);

  const worker =
    getWorker(workerType);

  if (!worker) {
    pushRuntimeEntry({
      module: job.module,
      action: "worker-router",
      type: "supervision",
      status: "failed",
      entityId:
        job.payload?.id,
      message:
        `Aucun worker trouvé : ${workerType}`,
    });

    return;
  }

  pushRuntimeEntry({
    module: job.module,
    action: "worker-router",
    type: "workflow",
    status: "success",
    entityId:
      job.payload?.id,
    message:
      `Job routé vers ${workerType}-worker`,
  });

  await worker.execute(job);
}
'@ | Set-Content "src/core/router/worker-router.ts"

Write-Host "=== ERP WORKER ROUTER créé avec succès ===" -ForegroundColor Green