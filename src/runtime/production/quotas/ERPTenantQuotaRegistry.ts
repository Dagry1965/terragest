import type { ERPTenantQuota } from "./ERPTenantQuota";

export const ERPTenantQuotaRegistry: ERPTenantQuota[] = [
  {
    tenantId: "tenant_demo",
    maxUsers: 100,
    maxModules: 25,
    maxStorageGb: 500,
    maxWorkflowExecutionsPerDay: 5000,
    maxQueueJobsPerHour: 2000,
  },
  {
    tenantId: "tenant_agricorp",
    maxUsers: 30,
    maxModules: 10,
    maxStorageGb: 100,
    maxWorkflowExecutionsPerDay: 1000,
    maxQueueJobsPerHour: 400,
  },
  {
    tenantId: "tenant_farmgroup",
    maxUsers: 10,
    maxModules: 5,
    maxStorageGb: 20,
    maxWorkflowExecutionsPerDay: 200,
    maxQueueJobsPerHour: 100,
  },
];