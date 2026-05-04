// src/platform/dependencies/DependencyValidator.ts

import { ModuleRegistry }
from "@/platform/registry/ModuleRegistry";

import { ModuleDependencies }
from "@/platform/dependencies/ModuleDependencies";

export class DependencyValidator {

  static validate() {

    const modules =
      ModuleRegistry.getEnabledModules();

    const moduleNames =
      modules.map(module => module.name);

    for (
      const [module, dependencies]
      of Object.entries(ModuleDependencies)
    ) {

      for (const dependency of dependencies) {

        if (
          !moduleNames.includes(dependency)
        ) {

          console.warn(
            `[DEPENDENCY WARNING]
             ${module}
             requires
             ${dependency}`
          );
        }
      }
    }
  }
}