import {
  registerWorker,
} from "@/core/workers/worker-registry";

import {
  executeWorkflowWorker,
} from "@/core/workers/workflow-worker";

import {
  executeNotificationWorker,
} from "@/core/workers/notification-worker";

import {
  executeAnalyticsWorker,
} from "@/core/workers/analytics-worker";

import {
  executeMaintenanceWorker,
} from "@/core/workers/maintenance-worker";

import {
  executeExportWorker,
} from "@/core/workers/export-worker";

registerWorker({
  type: "workflow",
  execute:
    executeWorkflowWorker,
});

registerWorker({
  type: "notification",
  execute:
    executeNotificationWorker,
});

registerWorker({
  type: "analytics",
  execute:
    executeAnalyticsWorker,
});

registerWorker({
  type: "maintenance",
  execute:
    executeMaintenanceWorker,
});

registerWorker({
  type: "export",
  execute:
    executeExportWorker,
});
