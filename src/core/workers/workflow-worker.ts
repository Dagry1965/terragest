import {
  incrementMetric,
} from "@/core/metrics/metrics-engine";

import {
  ERPJob,
} from "@/core/jobs/job-queue";

import {
  pushRuntimeEntry,
} from "@/core/runtime/runtime-timeline";

export async function executeWorkflowWorker(
  job: ERPJob
) {
  pushRuntimeEntry({
    module: job.module,
    action: "workflow-worker",
    type: "workflow",
    status: "success",
    entityId:
      job.payload?.id,
    message:
      `Workflow worker exécuté : ${job.name}`,
  });

  incrementMetric(
    "workflowExecutions"
  );

  console.log(
    "WORKFLOW WORKER",
    job
  );
}

