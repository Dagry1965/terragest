// src/platform/registry/ModuleRegistry.ts

export interface ERPModule {

  name: string;

  enabled: boolean;

  version: string;
}

class ModuleRegistryManager {

  private modules:
    ERPModule[] = [];

  register(
    module: ERPModule
  ) {

    console.log(
      "[MODULE REGISTERED]",
      module.name
    );

    this.modules.push(module);
  }

  getModules() {

    return this.modules;
  }

  getEnabledModules() {

    return this.modules.filter(
      module => module.enabled
    );
  }
}

export const ModuleRegistry =
  new ModuleRegistryManager();
