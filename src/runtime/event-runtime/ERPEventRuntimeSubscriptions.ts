import type {
  ERPEventRuntimeSubscription,
} from "./ERPEventRuntimeTypes";

export const erpEventRuntimeSubscriptions: ERPEventRuntimeSubscription[] = [
  {
    id: "materiel-breakdown-to-maintenance",
    moduleKey: "materiels",
    eventName: "materiel.breakdown.detected",
    handlerLabel: "Declencher maintenance",
  },
  {
    id: "materiel-breakdown-to-stocks",
    moduleKey: "stocks",
    eventName: "materiel.breakdown.detected",
    handlerLabel: "Verifier pieces disponibles",
  },
  {
    id: "stock-critical-to-purchase",
    moduleKey: "stocks",
    eventName: "stock.critical.detected",
    handlerLabel: "Preparer reapprovisionnement",
  },
  {
    id: "workflow-completed-to-audit",
    moduleKey: "exploitations",
    eventName: "workflow.completed",
    handlerLabel: "Tracer audit exploitation",
  },
];