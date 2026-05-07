Write-Host "=== TERRAGEST_V2 - SETUP ERP RETRY ENGINE ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/core/retry" | Out-Null

@'
import {
  ERPJob,
} from "@/core/jobs/job-queue";

import {
  pushRuntimeEntry,
} from "@/core/runtime/runtime-timeline";

export const MAX_RETRIES = 3;

export async function retryJob(
  job: ERPJob
) {
  if (
    job.retries >= MAX_RETRIES
  ) {
    job.status = "failed";

    pushRuntimeEntry({
      module: job.module,
      action: "retry",
      type: "supervision",
      status: "failed",
      entityId:
        job.payload?.id,
      message:
        `Job ${job.name} définitivement échoué`,
    });

    console.log(
      "ERP JOB DEAD",
      job
    );

    return false;
  }

  job.retries += 1;

  job.status = "pending";

  pushRuntimeEntry({
    module: job.module,
    action: "retry",
    type: "workflow",
    status: "warning",
    entityId:
      job.payload?.id,
    message:
      `Retry job ${job.name} (${job.retries})`,
  });

  console.log(
    "ERP JOB RETRY",
    job
  );

  return true;
}
'@ | Set-Content "src/core/retry/retry-engine.ts"

Write-Host "=== ERP RETRY ENGINE créé avec succès ===" -ForegroundColor Green