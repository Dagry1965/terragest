export type ERPMonitoringMetrics = {
  modules: number;
  tenants: number;
  workers: number;
  workflows: number;
  queueJobs: number;
  realtimeMessages: number;
  securityAudits: number;
  persistenceRecords: number;
  healthWarnings: number;
  healthCritical: number;
};