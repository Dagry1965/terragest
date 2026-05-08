import { ERPModuleRegistry } from "../ERPModuleRegistry";
import { coreERPModules } from "../definitions/coreModules";

export function registerCoreModules() {
  ERPModuleRegistry.registerMany(coreERPModules);
  return ERPModuleRegistry.all();
}
