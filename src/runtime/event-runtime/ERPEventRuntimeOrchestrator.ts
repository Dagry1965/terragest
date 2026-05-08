import { ERPEventRuntimeBus } from "./ERPEventRuntimeBus";

export class ERPEventRuntimeOrchestrator {
  static simulateMaterielBreakdown() {
    return ERPEventRuntimeBus.emit({
      name: "materiel.breakdown.detected",
      sourceModule: "materiels",
      level: "danger",
      payload: {
        materielId: "MAT-204",
        severity: "critical",
      },
    });
  }

  static simulateStockCritical() {
    return ERPEventRuntimeBus.emit({
      name: "stock.critical.detected",
      sourceModule: "stocks",
      level: "warning",
      payload: {
        produitId: "PROD-011",
        quantite: 4,
      },
    });
  }

  static simulateWorkflowCompleted() {
    return ERPEventRuntimeBus.emit({
      name: "workflow.completed",
      sourceModule: "exploitations",
      level: "success",
      payload: {
        workflowId: "WF-001",
      },
    });
  }
}