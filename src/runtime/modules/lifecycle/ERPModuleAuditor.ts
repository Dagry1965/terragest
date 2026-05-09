import { coreERPModules } from "../definitions/coreModules";
import { ERPModuleDependencyGraph } from "./ERPModuleDependencyGraph";

export class ERPModuleAuditor {

  static audit() {

    const errors: string[] = [];

    for (const module of coreERPModules) {

      const moduleKey =
        module.metadata.key;

      const dependencies =
        ERPModuleDependencyGraph[
          moduleKey as keyof typeof ERPModuleDependencyGraph
        ] ?? [];

      for (const dependency of dependencies) {

        const dependencyExists =
          coreERPModules.some(
            (item) =>
              item.metadata.key === dependency
          );

        if (!dependencyExists) {

          errors.push(
            `[DEPENDENCY_MISSING] ${moduleKey} -> ${dependency}`
          );
        }
      }

      if (!module.schema.fields.length) {

        errors.push(
          `[FIELDS_MISSING] ${moduleKey}`
        );
      }

      if (!module.metadata.routes?.list) {

        errors.push(
          `[ROUTE_MISSING] ${moduleKey}`
        );
      }
    }

    return {
      success: errors.length === 0,
      errors,
    };
  }
}