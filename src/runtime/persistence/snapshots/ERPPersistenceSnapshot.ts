import {
  ERPRuntimePersistenceService,
} from "../stores/ERPRuntimePersistenceService";

export async function getERPPersistenceSnapshot() {
  const [
    events,
    traces,
    alerts,
    workflows,
    queueJobs,
    audit,
    securityAudit,
  ] = await Promise.all([
    ERPRuntimePersistenceService.events.list(),
    ERPRuntimePersistenceService.traces.list(),
    ERPRuntimePersistenceService.alerts.list(),
    ERPRuntimePersistenceService.workflows.list(),
    ERPRuntimePersistenceService.queueJobs.list(),
    ERPRuntimePersistenceService.audit.list(),
    ERPRuntimePersistenceService.securityAudit.list(),
  ]);

  return {
    events,
    traces,
    alerts,
    workflows,
    queueJobs,
    audit,
    securityAudit,
    total:
      events.length +
      traces.length +
      alerts.length +
      workflows.length +
      queueJobs.length +
      audit.length +
      securityAudit.length,
  };
}