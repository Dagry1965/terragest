export const GeneratedRuntimeBindings = {

  terrains: {
    workflows: [
      "terrain-creation-workflow",
    ],
    permissions: [
      "terrain.read",
      "terrain.create",
      "terrain.update",
    ],
    states: [
      "draft",
      "active",
      "archived",
    ],
  },

  exploitations: {
    workflows: [
      "exploitation-onboarding",
    ],
    permissions: [
      "exploitation.read",
      "exploitation.create",
    ],
    states: [
      "draft",
      "active",
    ],
  },

  stocks: {
    workflows: [
      "stock-monitoring",
    ],
    permissions: [
      "stock.read",
      "stock.update",
    ],
    states: [
      "available",
      "critical",
      "empty",
    ],
  },

  contrats: {
    workflows: [
      "contract-validation",
    ],
    permissions: [
      "contrat.read",
      "contrat.create",
    ],
    states: [
      "draft",
      "signed",
      "expired",
    ],
  },

  maintenance: {
    workflows: [
      "maintenance-workflow",
    ],
    permissions: [
      "maintenance.read",
      "maintenance.create",
    ],
    states: [
      "pending",
      "in_progress",
      "done",
    ],
  },

  interventions: {
    workflows: [
      "intervention-workflow",
    ],
    permissions: [
      "intervention.read",
      "intervention.create",
    ],
    states: [
      "planned",
      "running",
      "completed",
    ],
  },

  materiels: {
    workflows: [
      "materiel-breakdown-flow",
    ],
    permissions: [
      "materiel.read",
      "materiel.update",
    ],
    states: [
      "available",
      "maintenance",
      "broken",
    ],
  },

  paiements: {
    workflows: [
      "payment-validation",
    ],
    permissions: [
      "paiement.read",
      "paiement.create",
    ],
    states: [
      "pending",
      "paid",
      "failed",
    ],
  },

};