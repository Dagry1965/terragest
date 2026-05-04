// src/platform/dependencies/ModuleDependencies.ts

export const ModuleDependencies = {

  exploitations: [
    "terrains"
  ],

  interventions: [
    "exploitations",
    "utilisateurs"
  ],

  recoltes: [
    "exploitations",
    "stocks"
  ],

  mouvementsStock: [
    "stocks",
    "produits"
  ],

  maintenance: [
    "materiels"
  ],

  paiements: [
    "factures",
    "clients"
  ]
};