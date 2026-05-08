export type ERPTenantQuota = {
  tenantId: string;
  maxUsers: number;
  maxModules: number;
  maxStorageGb: number;
  maxWorkflowExecutionsPerDay: number;
  maxQueueJobsPerHour: number;
};