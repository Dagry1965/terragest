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
