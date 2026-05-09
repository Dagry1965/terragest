export interface ERPGeneratedModule {

  key: string;

  label: string;

  route: string;

  enabled: boolean;
}

export class ERPModuleGenerationEngine {

  private modules:
    ERPGeneratedModule[] = [];

  registerModule(
    module: ERPGeneratedModule
  ) {

    this.modules.push(module);
  }

  getModules() {

    return this.modules;
  }

  generateRoutes() {

    return this.modules.map(
      module => ({
        key: module.key,
        route: module.route,
      })
    );
  }

  generateMenus() {

    return this.modules.map(
      module => ({
        label: module.label,
        href: module.route,
      })
    );
  }

  generatePermissions() {

    return this.modules.map(
      module => ({
        module: module.key,
        permissions: [
          "create",
          "read",
          "update",
          "delete",
        ],
      })
    );
  }
}

export const erpModuleGenerationEngine =
  new ERPModuleGenerationEngine();