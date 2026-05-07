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
