import { ERPDefaultSchemas } from "./ERPDefaultSchemas";
import type { ERPGeneratedSchema } from "./ERPGeneratedSchema";

export function resolveERPGeneratedSchema(
  moduleKey: string
): ERPGeneratedSchema {
  return (
    ERPDefaultSchemas.find((schema) => schema.moduleKey === moduleKey) ?? {
      moduleKey,
      moduleLabel: moduleKey,
      description: "Module ERP runtime.",
      fields: [
        { key: "nom", label: "Nom", type: "text" },
        { key: "statut", label: "Statut", type: "status" },
      ],
    }
  );
}