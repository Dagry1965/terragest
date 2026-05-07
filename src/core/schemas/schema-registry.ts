import { exploitationsSchema } from "./exploitations.schema";
import { terrainsSchema } from "./terrains.schema";
import { materielsSchema } from "./materiels.schema";

export const schemaRegistry = {
  exploitations: exploitationsSchema,
  terrains: terrainsSchema,
  materiels: materielsSchema,
};

export function getSchema(moduleKey: string) {
  return schemaRegistry[
    moduleKey as keyof typeof schemaRegistry
  ];
}
