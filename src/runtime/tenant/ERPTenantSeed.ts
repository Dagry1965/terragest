import {
  ERPTenantMetricsStore,
} from "./metrics/ERPTenantMetricsStore";

let seeded = false;

export function seedERPTenantRuntime() {

  if (seeded) {
    return;
  }

  seeded = true;

  ERPTenantMetricsStore.set({
    tenantId: "tenant_demo",
    activeUsers: 18,
    workflows: 24,
    automations: 12,
    queueJobs: 5,
    alerts: 2,
    storage: 82,
  });

  ERPTenantMetricsStore.set({
    tenantId: "tenant_agricorp",
    activeUsers: 7,
    workflows: 8,
    automations: 4,
    queueJobs: 2,
    alerts: 1,
    storage: 31,
  });

  ERPTenantMetricsStore.set({
    tenantId: "tenant_farmgroup",
    activeUsers: 2,
    workflows: 1,
    automations: 0,
    queueJobs: 0,
    alerts: 0,
    storage: 8,
  });
}