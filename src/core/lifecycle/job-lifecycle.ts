import {
  ERPJob,
} from "@/core/jobs/job-queue";

import {
  pushRuntimeEntry,
} from "@/core/runtime/runtime-timeline";

const archivedJobs:
  ERPJob[] = [];

export function archiveJob(
  job: ERPJob
) {
  archivedJobs.unshift(job);

  pushRuntimeEntry({
    module: job.module,
    action: "archive-job",
    type: "audit",
    status: "success",
    entityId:
      job.payload?.id,
    message:
      `Job archiv� : ${job.name}`,
  });

  console.log(
    "ERP JOB ARCHIVED",
    job
  );
}

export function getArchivedJobs() {
  return archivedJobs;
}

export function cleanupCompletedJobs(
  jobs: ERPJob[]
) {
  return jobs.filter(
    (job) => {
      if (
        job.status ===
        "completed"
      ) {
        archiveJob(job);

        return false;
      }

      return true;
    }
  );
}
