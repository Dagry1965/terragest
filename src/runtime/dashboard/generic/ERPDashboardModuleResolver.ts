import type { ERPModule } from "@/runtime/modules";
import { coreERPModules } from "@/runtime/modules/definitions/coreModules";

export function resolveDashboardModule(moduleKey: string): ERPModule | null {
  return (
    coreERPModules.find(
      (module) => module.metadata.key === moduleKey
    ) ?? null
  );
}