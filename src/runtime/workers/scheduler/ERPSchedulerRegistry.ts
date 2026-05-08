import type {
  ERPScheduledTask,
} from "../engine/ERPWorkerTypes";

export const ERPSchedulerRegistry: ERPScheduledTask[] = [
  {
    id: "task_stock_sync",
    label: "Synchronisation stock",
    module: "stocks",
    cron: "*/15 * * * *",
    enabled: true,
    nextRun: new Date().toISOString(),
  },

  {
    id: "task_payment_retry",
    label: "Retry paiements",
    module: "paiements",
    cron: "*/5 * * * *",
    enabled: true,
    nextRun: new Date().toISOString(),
  },

  {
    id: "task_reporting",
    label: "Generation reporting",
    module: "reporting",
    cron: "0 * * * *",
    enabled: true,
    nextRun: new Date().toISOString(),
  },
];