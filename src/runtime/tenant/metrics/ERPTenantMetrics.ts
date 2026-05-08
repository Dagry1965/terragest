export type ERPTenantMetrics = {
  tenantId: string;

  activeUsers: number;

  workflows: number;

  automations: number;

  queueJobs: number;

  alerts: number;

  storage: number;
};