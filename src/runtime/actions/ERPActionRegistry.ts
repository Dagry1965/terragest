import type { ERPModule } from "@/runtime/modules";
import { ERPActionResolver } from "./ERPActionResolver";

export const ERPActionRegistry = {
  forModule(module: ERPModule) {
    return ERPActionResolver.resolve(module);
  },

  forRow(module: ERPModule, id?: string) {
    return ERPActionResolver.resolveRowActions(module, id);
  },
};