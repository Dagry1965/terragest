import {
  ERPJob,
} from "@/core/jobs/job-queue";

import {
  pushRuntimeEntry,
} from "@/core/runtime/runtime-timeline";

export async function executeNotificationWorker(
  job: ERPJob
) {
  pushRuntimeEntry({
    module: job.module,
    action: "notification-worker",
    type: "event",
    status: "success",
    entityId:
      job.payload?.id,
    message:
      `Notification envoyée : ${job.name}`,
  });

  console.log(
    "NOTIFICATION WORKER",
    job
  );
}
