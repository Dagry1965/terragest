import {
  ERPEventBus,
} from "@/runtime/events/bus/ERPEventBus";

import {
  ERPTraceStore,
} from "./traces/ERPTraceStore";

import {
  ERPAlertStore,
} from "./alerts/ERPAlertStore";

let seeded = false;

export function seedERPRuntimeObservability() {

  if (seeded) {
    return;
  }

  seeded = true;

  ERPEventBus.emit({
    id: "evt_1",
    type: "ENTITY_CREATED",
    module: "materiels",
    entityId: "MAT-001",
    timestamp: new Date().toISOString(),
    actor: "runtime",
  });

  ERPEventBus.emit({
    id: "evt_2",
    type: "WORKFLOW_STARTED",
    module: "maintenance",
    timestamp: new Date().toISOString(),
    actor: "workflow-engine",
  });

  ERPTraceStore.add({
    traceId: "trace_1",
    module: "paiements",
    action: "PAYMENT_VALIDATION",
    status: "success",
    duration: 182,
    timestamp: new Date().toISOString(),
  });

  ERPTraceStore.add({
    traceId: "trace_2",
    module: "stocks",
    action: "LOW_STOCK_ANALYSIS",
    status: "warning",
    duration: 391,
    timestamp: new Date().toISOString(),
  });

  ERPAlertStore.add({
    id: "alert_1",
    module: "maintenance",
    title: "Maintenance critique",
    description: "Intervention prioritaire detectee.",
    level: "critical",
    timestamp: new Date().toISOString(),
  });

  ERPAlertStore.add({
    id: "alert_2",
    module: "stocks",
    title: "Stock faible",
    description: "Seuil minimum atteint.",
    level: "warning",
    timestamp: new Date().toISOString(),
  });
}