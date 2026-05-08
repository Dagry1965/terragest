import type {
  ERPWorkflowDefinition,
} from "../engine/ERPWorkflowTypes";

export const ERPWorkflowRegistry: ERPWorkflowDefinition[] = [
  {
    key: "maintenance-critical-flow",
    module: "maintenance",
    label: "Maintenance critique",
    description: "Workflow de traitement des maintenances critiques.",
    initialState: "pending",
    steps: [
      {
        key: "analyse",
        label: "Analyse de la demande",
        type: "task",
        next: "approval",
      },
      {
        key: "approval",
        label: "Validation responsable",
        type: "approval",
        next: "intervention",
        onFailure: "compensation",
      },
      {
        key: "intervention",
        label: "Creation intervention",
        type: "automation",
        next: "notification",
      },
      {
        key: "notification",
        label: "Notification equipe",
        type: "notification",
      },
      {
        key: "compensation",
        label: "Compensation",
        type: "compensation",
      },
    ],
  },
  {
    key: "stock-replenishment-flow",
    module: "stocks",
    label: "Reapprovisionnement stock",
    description: "Workflow de reapprovisionnement automatique.",
    initialState: "pending",
    steps: [
      {
        key: "detect",
        label: "Detection seuil",
        type: "event",
        next: "order",
      },
      {
        key: "order",
        label: "Preparation commande",
        type: "automation",
        next: "approval",
      },
      {
        key: "approval",
        label: "Validation achat",
        type: "approval",
        next: "completed",
      },
    ],
  },
  {
    key: "payment-validation-flow",
    module: "paiements",
    label: "Validation paiement",
    description: "Workflow de validation des paiements.",
    initialState: "pending",
    steps: [
      {
        key: "control",
        label: "Controle paiement",
        type: "task",
        next: "approval",
      },
      {
        key: "approval",
        label: "Validation financiere",
        type: "approval",
        next: "notification",
      },
      {
        key: "notification",
        label: "Notification comptable",
        type: "notification",
      },
    ],
  },
];