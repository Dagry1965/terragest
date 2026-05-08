import {
  ERPEventBus,
} from "@/runtime/events/bus/ERPEventBus";

import {
  initializeERPAutomationEngine,
} from "./engine/ERPAutomationEngine";

let seeded = false;

export function seedERPRuntimeAutomation() {

  if (seeded) {
    return;
  }

  seeded = true;

  initializeERPAutomationEngine();

  ERPEventBus.emit({
    id: "auto_evt_1",
    type: "ENTITY_UPDATED",
    module: "stocks",
    timestamp: new Date().toISOString(),
    actor: "automation-runtime",
  });

  ERPEventBus.emit({
    id: "auto_evt_2",
    type: "WORKFLOW_STARTED",
    module: "maintenance",
    timestamp: new Date().toISOString(),
    actor: "workflow-engine",
  });

  ERPEventBus.emit({
    id: "auto_evt_3",
    type: "ENTITY_CREATED",
    module: "paiements",
    timestamp: new Date().toISOString(),
    actor: "payments-runtime",
  });
}