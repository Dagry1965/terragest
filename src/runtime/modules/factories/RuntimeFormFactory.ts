import type { ERPModule } from "../ERPModule";
import { ERPModuleBuilder } from "../builders/ERPModuleBuilder";

export class RuntimeFormFactory {
  static create(module: ERPModule) {
    return ERPModuleBuilder.buildForm(module);
  }
}
