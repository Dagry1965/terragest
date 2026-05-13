import {
  allERPModules,
} from "./definitions/coreModules";

import {
  ERPModuleRegistry,
} from "./ERPModuleRegistry";

export function registerCoreERPModules() {
  ERPModuleRegistry.clear();

  ERPModuleRegistry.registerMany(
    allERPModules
  );

  return ERPModuleRegistry.all();
}