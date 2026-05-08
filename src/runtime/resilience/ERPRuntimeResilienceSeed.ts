import { ERPQueueWorker } from "./worker/ERPQueueWorker";

let seeded = false;

export function seedERPRuntimeResilience() {
  if (seeded) {
    return;
  }

  seeded = true;

  ERPQueueWorker.enqueue({
    type: "STOCK_REPLENISHMENT",
    module: "stocks",
    maxAttempts: 3,
    payload: {
      product: "ENGRAIS-001",
    },
  });

  ERPQueueWorker.enqueue({
    type: "PAYMENT_RETRY",
    module: "paiements",
    maxAttempts: 2,
    payload: {
      reference: "PAY-001",
      forceFailure: true,
    },
  });

  ERPQueueWorker.enqueue({
    type: "MAINTENANCE_NOTIFICATION",
    module: "maintenance",
    maxAttempts: 3,
    payload: {
      priority: "critical",
    },
  });

  ERPQueueWorker.processAll(10);
}