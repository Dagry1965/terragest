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
