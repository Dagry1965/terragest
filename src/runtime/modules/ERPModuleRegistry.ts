import { ERPModule } from "./ERPModule";

class Registry {
  private modules: ERPModule[] = [];

  register(module: ERPModule) {
    if (this.modules.some((m) => m.code === module.code)) return;
    this.modules.push({ enabled: true, ...module });
  }

  getAll() {
    return this.modules.filter((m) => m.enabled !== false);
  }

  getNavigation() {
    return this.getAll().map((module) => ({
      label: module.name,
      href: module.routes?.[0] || `/${module.code}`,
      code: module.code,
    }));
  }

  validate() {
    return this.getAll().map((module) => ({
      code: module.code,
      name: module.name,
      hasRoutes: !!module.routes?.length,
      hasPermissions: !!module.permissions?.length,
      hasWorkflows: !!module.workflows?.length,
      hasRules: !!module.rules?.length,
      hasAnalytics: !!module.analytics?.length,
      hasNotifications: !!module.notifications?.length,
    }));
  }
}

export const ERPModuleRegistry = new Registry();
