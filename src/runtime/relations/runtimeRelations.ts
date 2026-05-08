import {
  RuntimeRelation,
}
from "@/runtime/relations/RuntimeRelation";

export const runtimeRelations:
  RuntimeRelation[] = [

  {
    source:
      "exploitations",

    target:
      "terrains",

    type:
      "one-to-many",

    foreignKey:
      "exploitationId",

    label:
      "possède",
  },

  {
    source:
      "terrains",

    target:
      "materiels",

    type:
      "one-to-many",

    foreignKey:
      "terrainId",

    label:
      "utilise",
  },

  {
    source:
      "materiels",

    target:
      "maintenance",

    type:
      "one-to-many",

    foreignKey:
      "materielId",

    label:
      "subit",
  },

  {
    source:
      "maintenance",

    target:
      "interventions",

    type:
      "one-to-many",

    foreignKey:
      "maintenanceId",

    label:
      "déclenche",
  },

  {
    source:
      "interventions",

    target:
      "stocks",

    type:
      "many-to-many",

    foreignKey:
      "interventionId",

    label:
      "consomme",
  },

  {
    source:
      "stocks",

    target:
      "produits",

    type:
      "many-to-one",

    foreignKey:
      "produitId",

    label:
      "référence",
  },
];
