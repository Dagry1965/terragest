import {
  DynamicField,
  DynamicFormContext,
} from "@/runtime/forms/DynamicField";

import {
  coreERPModules,
  ERPModuleBuilder,
} from "@/runtime/modules";

function toDynamicField(
  field: any
): DynamicField {
  return {
    name: field.key,
    label: field.label,

    type:
      field.type === "status" ||
      field.type === "relation"
        ? "select"
        : field.type,

    required: field.required,
    options: field.options,
  };
}

export class DynamicFormRegistry {
  static getForm(
    module: string,
    _context: DynamicFormContext
  ) {
    const coreModule =
      coreERPModules.find(
        (item) =>
          item.metadata.key === module
      );

    if (!coreModule) {
      console.warn(
        "No core module definition for module:",
        module
      );

      return [];
    }

    return ERPModuleBuilder
      .buildForm(coreModule)
      .fields
      .map(toDynamicField);
  }

  static getAvailableModules() {
    return coreERPModules.map(
      (module) => module.metadata.key
    );
  }
}