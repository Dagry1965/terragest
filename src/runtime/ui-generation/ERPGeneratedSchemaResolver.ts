import {
  CoreModuleRuntimeAdapter,
} from "@/runtime/modules/adapters/CoreModuleRuntimeAdapter";

import type {
  ERPGeneratedSchema,
} from "./ERPGeneratedSchema";

export function resolveERPGeneratedSchema(
  moduleKey: string
): ERPGeneratedSchema {
  const generatedSchemas =
    CoreModuleRuntimeAdapter
      .toGeneratedSchemas();

  return (
    generatedSchemas.find(
      (item) =>
        item.moduleKey === moduleKey
    ) ?? {
      moduleKey,
      moduleLabel: moduleKey,
      description: "Module ERP runtime.",
      fields: [
        {
          key: "nom",
          label: "Nom",
          type: "text",
        },
        {
          key: "statut",
          label: "Statut",
          type: "status",
        },
      ],
    }
  );
}