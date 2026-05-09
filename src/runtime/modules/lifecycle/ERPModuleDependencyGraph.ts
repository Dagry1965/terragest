export const ERPModuleDependencyGraph = {

  exploitations: [],

  materiels: [
    "exploitations",
  ],

  terrains: [
    "exploitations",
  ],

  interventions: [
    "materiels",
  ],

  maintenance: [
    "materiels",
  ],

  stocks: [
    "produits",
  ],

  paiements: [
    "contrats",
  ],
};