import {
  ERPJob,
} from "@/core/jobs/job-queue";

import {
  pushRuntimeEntry,
} from "@/core/runtime/runtime-timeline";

export async function executeAnalyticsWorker(
  job: ERPJob
) {
  pushRuntimeEntry({
    module: job.module,
    action: "analytics-worker",
    type: "workflow",
    status: "success",
    entityId:
      job.payload?.id,
    message:
      `Analytics worker exécuté : ${job.name}`,
  });

  console.log(
    "ANALYTICS WORKER",
    job
  );
}
