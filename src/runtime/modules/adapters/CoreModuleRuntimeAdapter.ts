import { allERPModules } from "../definitions/coreModules";

import type {
  RuntimeModuleContract,
} from "@/runtime/core/RuntimeContracts";

import type {
  ERPGeneratedSchema,
} from "@/runtime/ui-generation";

function toGeneratedFieldType(
  type: string | undefined
) {
  switch (type) {
    case "text":
    case "number":
    case "date":
    case "status":
    case "select":
    case "currency":
      return type;

    case "email":
    case "relation":
      return "text";

    default:
      return "text";
  }
}

export class CoreModuleRuntimeAdapter {
  static toRuntimeModules():
    RuntimeModuleContract[] {
    return allERPModules.map((module) => ({
      id:
        module.metadata.key,

      label:
        module.metadata.label,

      domain:
        module.metadata.key,

      version:
        "1.0.0",

      status:
        module.metadata.enabled === false
          ? "disabled"
          : "active",

      capabilities: [
        "workflow",
        "automation",
        "audit",
        "permissions",
        "states",
        "relations",
        "observability",
        "realtime",
      ],

      events:
        [],

      workflows:
        module.workflows?.map(
          (workflow) => workflow.key
        ) ?? [],

      permissions:
        module.permissions
          ? Object.entries(module.permissions)
              .filter(([, enabled]) => enabled)
              .map(([key]) => key)
          : [],

      states:
        module.workflows?.flatMap(
          (workflow) => workflow.states ?? []
        ) ?? [],

      relations:
        module.relations?.map(
          (relation) => relation.key
        ) ?? [],
    }));
  }

  static toGeneratedSchemas():
    ERPGeneratedSchema[] {
    return allERPModules.map((module) => ({
      moduleKey:
        module.metadata.key,

      moduleLabel:
        module.metadata.label,

      description:
        module.metadata.description ?? "",

      fields:
        module.schema.fields.map((field) => ({
          key:
            field.key,

          label:
            field.label,

          type:
            toGeneratedFieldType(
              String(field.type)
            ),

          required:
            field.required,
        })),
    }));
  }

  static toRuntimeBindings() {
    return Object.fromEntries(
      allERPModules.map((module) => [
        module.metadata.key,
        {
          workflows:
            module.workflows?.map(
              (workflow) => workflow.key
            ) ?? [],

          permissions:
            module.permissions
              ? Object.entries(module.permissions)
                  .filter(([, enabled]) => enabled)
                  .map(([key]) => key)
              : [
                  "create",
                  "read",
                  "update",
                  "delete",
                ],

          states:
            module.workflows?.flatMap(
              (workflow) => workflow.states ?? []
            ) ?? [],
        },
      ])
    );
  }
  static toRuntimeWorkflows() {
    return Object.fromEntries(
      allERPModules.map((module) => [
        module.metadata.key,
        module.workflows?.map(
          (workflow) => workflow.key
        ) ?? [],
      ])
    );
  }
}