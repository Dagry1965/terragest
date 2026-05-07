import {
  incrementMetric,
} from "@/core/metrics/metrics-engine";

import {
  getPendingJobs,
  ERPJob,
} from "@/core/jobs/job-queue";

import {
  sortJobsByPriority,
} from "@/core/priority/priority-engine";

import {
  routeJob,
} from "@/core/router/worker-router";

import {
  retryJob,
} from "@/core/retry/retry-engine";

import {
  pushDeadJob,
} from "@/core/dead-letter/dead-letter-queue";

import {
  pushRuntimeEntry,
} from "@/core/runtime/runtime-timeline";

async function processJob(
  job: ERPJob
) {
  try {
    pushRuntimeEntry({
      module: job.module,
      action: "worker-loop",
      type: "workflow",
      status: "success",
      entityId:
        job.payload?.id,
      message:
        `Traitement job ${job.name}`,
    });

    await routeJob(job);

    job.status =
      "completed";

    incrementMetric(
      "processedJobs"
    );
  } catch (error) {
    console.error(
      "ERP WORKER LOOP ERROR",
      error
    );

    job.status = "failed";

    const retry =
      await retryJob(job);

    if (!retry) {
      pushDeadJob(job);
    }
  }
}

export async function startWorkerLoop() {
  console.log(
    "ERP WORKER LOOP STARTED"
  );

  const pendingJobs =
    getPendingJobs();

  const prioritizedJobs =
    sortJobsByPriority(
      pendingJobs
    );

  for (const job of prioritizedJobs) {
    await processJob(job);
  }
}


