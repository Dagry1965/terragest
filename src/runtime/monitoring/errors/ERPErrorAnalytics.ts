import { ERPAlertStore } from "@/runtime/observability";
import { ERPDeadLetterStore } from "@/runtime/resilience";
import { ERPWorkerHistoryStore } from "@/runtime/workers";
import { ERPSecurityAuditStore } from "@/runtime/security";

export function getERPErrorAnalytics() {
  const alerts = ERPAlertStore.all();
  const dlq = ERPDeadLetterStore.all();
  const failedWorkers = ERPWorkerHistoryStore.failed();
  const denied = ERPSecurityAuditStore.denied();

  return {
    alerts: alerts.filter((alert) => alert.level !== "info"),
    dlq,
    failedWorkers,
    denied,
    total:
      alerts.filter((alert) => alert.level !== "info").length +
      dlq.length +
      failedWorkers.length +
      denied.length,
  };
}