export const GeneratedRuntimeTopology = {

  terrains: {
    emits: [
      "terrain.created",
      "terrain.updated",
    ],
    listensTo: [],
  },

  exploitations: {
    emits: [
      "exploitation.created",
    ],
    listensTo: [
      "terrain.created",
    ],
  },

  stocks: {
    emits: [
      "stock.updated",
    ],
    listensTo: [
      "materiel.breakdown",
    ],
  },

  contrats: {
    emits: [
      "contrat.created",
    ],
    listensTo: [],
  },

  maintenance: {
    emits: [
      "maintenance.created",
    ],
    listensTo: [
      "materiel.breakdown",
    ],
  },

  interventions: {
    emits: [
      "intervention.created",
    ],
    listensTo: [
      "maintenance.created",
    ],
  },

  materiels: {
    emits: [
      "materiel.breakdown",
    ],
    listensTo: [],
  },

  paiements: {
    emits: [
      "paiement.created",
    ],
    listensTo: [
      "contrat.created",
    ],
  },

};