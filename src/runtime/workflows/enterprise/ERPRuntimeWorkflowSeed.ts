import {
  ERPWorkflowEngine,
} from "./engine/ERPWorkflowEngine";

let seeded = false;

export function seedERPRuntimeWorkflows() {
  if (seeded) {
    return;
  }

  seeded = true;

  const maintenanceExecution =
    ERPWorkflowEngine.start("maintenance-critical-flow");

  ERPWorkflowEngine.start("stock-replenishment-flow");

  ERPWorkflowEngine.start("payment-validation-flow");

  if (maintenanceExecution) {
    ERPWorkflowEngine.complete(maintenanceExecution.id);
  }
}