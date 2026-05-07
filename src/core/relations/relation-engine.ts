export type RelationType =
  | "one-to-one"
  | "one-to-many"
  | "many-to-one"
  | "many-to-many";

export type ERPRelation = {
  sourceModule: string;

  targetModule: string;

  relationType: RelationType;

  foreignKey: string;

  label: string;
};

const relationRegistry:
  ERPRelation[] = [
    {
      sourceModule:
        "exploitations",

      targetModule:
        "terrains",

      relationType:
        "one-to-many",

      foreignKey:
        "exploitationId",

      label:
        "Terrains de l’exploitation",
    },

    {
      sourceModule:
        "materiels",

      targetModule:
        "interventions",

      relationType:
        "one-to-many",

      foreignKey:
        "materielId",

      label:
        "Interventions matériel",
    },

    {
      sourceModule:
        "stocks",

      targetModule:
        "mouvements",

      relationType:
        "one-to-many",

      foreignKey:
        "stockId",

      label:
        "Mouvements de stock",
    },

    {
      sourceModule:
        "contrats",

      targetModule:
        "paiements",

      relationType:
        "one-to-many",

      foreignKey:
        "contratId",

      label:
        "Paiements du contrat",
    },
  ];

export function getRelations(
  module: string
) {
  return relationRegistry.filter(
    (relation) =>
      relation.sourceModule ===
        module ||
      relation.targetModule ===
        module
  );
}

export function getRelationBetween(
  sourceModule: string,
  targetModule: string
) {
  return relationRegistry.find(
    (relation) =>
      relation.sourceModule ===
        sourceModule &&
      relation.targetModule ===
        targetModule
  );
}

export function getAllRelations() {
  return relationRegistry;
}
