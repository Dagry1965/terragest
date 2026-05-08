import type { ERPModule } from "./ERPModule";

class ERPModuleRegistryClass {
  private modules = new Map<string, ERPModule>();

  register(module: ERPModule) {
    this.modules.set(module.metadata.key, module);
    return module;
  }

  registerMany(modules: ERPModule[]) {
    modules.forEach((module) => this.register(module));
    return modules;
  }

  get(key: string) {
    return this.modules.get(key);
  }

  has(key: string) {
    return this.modules.has(key);
  }

  all() {
    return Array.from(this.modules.values()).sort(
      (a, b) => (a.metadata.order ?? 999) - (b.metadata.order ?? 999)
    );
  }

  visible() {
    return this.all().filter((module) => module.metadata.visible !== false);
  }

  enabled() {
    return this.all().filter((module) => module.metadata.enabled !== false);
  }

  clear() {
    this.modules.clear();
  }
}

export const ERPModuleRegistry = new ERPModuleRegistryClass();
