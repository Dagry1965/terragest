import type { ERPModule } from "@/runtime/modules";
import { allERPModules } from "@/runtime/modules/definitions/coreModules";

export function resolveDashboardModule(moduleKey: string): ERPModule | null {
  return (
    allERPModules.find(
      (module) => module.metadata.key === moduleKey
    ) ?? null
  );
}