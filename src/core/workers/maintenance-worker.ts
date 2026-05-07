import {
  ERPJob,
} from "@/core/jobs/job-queue";

import {
  pushRuntimeEntry,
} from "@/core/runtime/runtime-timeline";

export async function executeMaintenanceWorker(
  job: ERPJob
) {
  pushRuntimeEntry({
    module: job.module,
    action: "maintenance-worker",
    type: "workflow",
    status: "warning",
    entityId:
      job.payload?.id,
    message:
      `Maintenance worker exécuté : ${job.name}`,
  });

  console.log(
    "MAINTENANCE WORKER",
    job
  );
}
