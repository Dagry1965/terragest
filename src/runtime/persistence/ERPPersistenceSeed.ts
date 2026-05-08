import {
  ERPRuntimePersistenceService,
} from "./stores/ERPRuntimePersistenceService";

let seeded = false;

export async function seedERPPersistenceRuntime() {
  if (seeded) {
    return;
  }

  seeded = true;

  await ERPRuntimePersistenceService.events.save({
    type: "ENTITY_CREATED",
    module: "materiels",
    actor: "runtime",
  });

  await ERPRuntimePersistenceService.traces.save({
    action: "WORKFLOW_STARTED",
    module: "maintenance",
    status: "success",
  });

  await ERPRuntimePersistenceService.alerts.save({
    title: "Stock faible",
    module: "stocks",
    level: "warning",
  });

  await ERPRuntimePersistenceService.workflows.save({
    workflowKey: "maintenance-critical-flow",
    state: "running",
  });

  await ERPRuntimePersistenceService.queueJobs.save({
    type: "PAYMENT_RETRY",
    module: "paiements",
    status: "completed",
  });

  await ERPRuntimePersistenceService.audit.save({
    module: "contrats",
    action: "export",
    actor: "admin",
  });

  await ERPRuntimePersistenceService.securityAudit.save({
    module: "paiements",
    action: "audit",
    allowed: true,
  });
}