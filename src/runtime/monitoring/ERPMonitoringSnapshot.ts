import { ERPRegistry } from "@/runtime/registry";
import { ERPTenantRegistry } from "@/runtime/tenant";
import { ERPWorkerRegistry, ERPWorkerHistoryStore } from "@/runtime/workers";
import { ERPWorkflowExecutionStore } from "@/runtime/workflows/enterprise";
import { ERPQueueStore } from "@/runtime/resilience";
import { getERPRealtimeSnapshot } from "@/runtime/realtime";
import { ERPSecurityAuditStore } from "@/runtime/security";
import { getERPHealthChecks } from "./health/ERPHealthCenter";
import { getERPDependencyGraph } from "./topology/ERPDependencyGraph";
import { getERPErrorAnalytics } from "./errors/ERPErrorAnalytics";

export function getERPMonitoringSnapshot() {
  const health = getERPHealthChecks();
  const realtime = getERPRealtimeSnapshot();
  const errors = getERPErrorAnalytics();

  return {
    metrics: {
      modules: ERPRegistry.modules().length,
      tenants: ERPTenantRegistry.length,
      workers: ERPWorkerRegistry.length,
      workflows: ERPWorkflowExecutionStore.all().length,
      queueJobs: ERPQueueStore.all().length,
      realtimeMessages: realtime.totalMessages,
      securityAudits: ERPSecurityAuditStore.all().length,
      persistenceRecords: 0,
      healthWarnings: health.filter((check) => check.status === "warning").length,
      healthCritical: health.filter((check) => check.status === "critical").length,
    },
    health,
    graph: getERPDependencyGraph(),
    errors,
    workerHistory: ERPWorkerHistoryStore.all(),
  };
}