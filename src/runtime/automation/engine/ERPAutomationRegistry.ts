import type {
  ERPAutomationRule,
} from "./ERPAutomationRule";

export const ERPAutomationRegistry:
  ERPAutomationRule[] = [

    {
      id: "auto_1",
      module: "stocks",
      trigger: "ENTITY_UPDATED",
      action: "ALERT",
      description: "Declenchement alerte stock.",
    },

    {
      id: "auto_2",
      module: "maintenance",
      trigger: "WORKFLOW_STARTED",
      action: "NOTIFY",
      description: "Notification workflow maintenance.",
    },

    {
      id: "auto_3",
      module: "paiements",
      trigger: "ENTITY_CREATED",
      action: "AUDIT",
      description: "Audit creation paiement.",
    },

    {
      id: "auto_4",
      module: "interventions",
      trigger: "WORKFLOW_COMPLETED",
      action: "WEBHOOK",
      description: "Webhook intervention.",
    },
];