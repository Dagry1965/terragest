import type { ERPModule } from "../ERPModule";
import { ERPModuleBuilder } from "../builders/ERPModuleBuilder";

export class RuntimeTableFactory {
  static create(module: ERPModule) {
    return ERPModuleBuilder.buildTable(module);
  }
}
