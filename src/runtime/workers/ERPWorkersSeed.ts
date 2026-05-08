import {
  ERPWorkerEngine,
} from "./engine/ERPWorkerEngine";

let seeded = false;

export function seedERPWorkersRuntime() {

  if (seeded) {
    return;
  }

  seeded = true;

  ERPWorkerEngine.executeJob(
    "worker_runtime_1",
    "materiels",
    "SYNC_MATERIELS"
  );

  ERPWorkerEngine.executeJob(
    "worker_automation_1",
    "stocks",
    "LOW_STOCK_AUTOMATION"
  );

  ERPWorkerEngine.executeJob(
    "worker_runtime_1",
    "paiements",
    "PAYMENT_RETRY",
    true
  );

  ERPWorkerEngine.refreshMetrics();
}