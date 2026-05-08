import type { ERPFieldDefinition } from "./ERPFieldDefinition";

export type ERPGeneratedSchema = {
  moduleKey: string;
  moduleLabel: string;
  description?: string;
  fields: ERPFieldDefinition[];
};