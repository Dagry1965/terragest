import { ERPModuleRegistry } from "../ERPModuleRegistry";
import { allERPModules } from "../definitions/coreModules";

export function registerCoreModules() {
  ERPModuleRegistry.registerMany(allERPModules);
  return ERPModuleRegistry.all();
}
