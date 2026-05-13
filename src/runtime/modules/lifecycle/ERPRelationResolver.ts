import type {
  ERPModuleField,
} from "../schemas/ERPModuleSchema";

import { allERPModules }
from "../definitions/coreModules";

export class ERPRelationResolver {

  static getRelations(
    moduleKey: string
  ) {

    const module =
      allERPModules.find(
        (item) =>
          item.metadata.key === moduleKey
      );

    if (!module) {
      return [];
    }

    return module.schema.fields.filter(
      (field: ERPModuleField) =>
        field.foreignKey === true
    );
  }

  static getReferencedModule(
    field: ERPModuleField
  ) {

    if (!field.references) {
      return null;
    }

    return allERPModules.find(
      (module) =>
        module.metadata.key ===
        field.references?.module
    );
  }

  static validateRelations() {

    const errors: string[] = [];

    for (const module of allERPModules) {

      for (const field of module.schema.fields) {

        if (
          field.foreignKey &&
          field.references
        ) {

          const targetModule =
            allERPModules.find(
              (item) =>
                item.metadata.key ===
                field.references?.module
            );

          if (!targetModule) {

            errors.push(
              `[RELATION_TARGET_MISSING] ${module.metadata.key}.${field.key}`
            );
          }
        }
      }
    }

    return {
      success: errors.length === 0,
      errors,
    };
  }
}