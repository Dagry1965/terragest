import {
  incrementMetric,
} from "@/core/metrics/metrics-engine";

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

    incrementMetric(
      "failedJobs"
    );

    incrementMetric(
      "deadJobs"
    );

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

  incrementMetric(
    "retriedJobs"
  );

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

