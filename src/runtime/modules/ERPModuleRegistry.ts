import type { ERPModuleDefinition } from "./ERPModuleDefinition";

export type ERPAnyModule = ERPModuleDefinition | any;

class ERPModuleRegistryClass {
  private modules = new Map<string, ERPAnyModule>();

  private getModuleKey(module: ERPAnyModule): string {
    return (
      module.key ??
      module.id ??
      module.name ??
      module.metadata?.key ??
      module.metadata?.id ??
      module.metadata?.name
    );
  }

  register(module: ERPAnyModule) {
    const key = this.getModuleKey(module);

    if (!key) {
      throw new Error("ERPModuleRegistry: module key is missing");
    }

    this.modules.set(key, module);
    return module;
  }

  registerMany(modules: ERPAnyModule[]) {
    modules.forEach((module) => this.register(module));
    return this.all();
  }

  get(moduleKey: string) {
    return this.modules.get(moduleKey);
  }

  all() {
    return Array.from(this.modules.values());
  }

  getAll() {
    return this.all();
  }

  has(moduleKey: string) {
    return this.modules.has(moduleKey);
  }

  clear() {
    this.modules.clear();
  }
}

export const ERPModuleRegistry = new ERPModuleRegistryClass();
