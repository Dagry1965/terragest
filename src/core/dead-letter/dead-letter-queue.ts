import {
  ERPJob,
} from "@/core/jobs/job-queue";

import {
  pushRuntimeEntry,
} from "@/core/runtime/runtime-timeline";

const deadLetterQueue:
  ERPJob[] = [];

export function pushDeadJob(
  job: ERPJob
) {
  deadLetterQueue.unshift(job);

  pushRuntimeEntry({
    module: job.module,
    action: "dead-letter",
    type: "supervision",
    status: "failed",
    entityId:
      job.payload?.id,
    message:
      `Dead job : ${job.name}`,
  });

  console.log(
    "ERP DEAD JOB",
    job
  );

  return job;
}

export function getDeadJobs() {
  return deadLetterQueue;
}

export async function replayDeadJob(
  jobId: string
) {
  const job =
    deadLetterQueue.find(
      (entry) =>
        entry.id === jobId
    );

  if (!job) {
    return null;
  }

  job.status = "pending";

  job.retries = 0;

  pushRuntimeEntry({
    module: job.module,
    action: "dead-letter-replay",
    type: "workflow",
    status: "warning",
    entityId:
      job.payload?.id,
    message:
      `Replay dead job ${job.name}`,
  });

  console.log(
    "ERP DEAD JOB REPLAY",
    job
  );

  return job;
}
