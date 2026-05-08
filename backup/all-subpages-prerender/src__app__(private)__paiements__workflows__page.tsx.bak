import { coreERPModules } from "@/runtime/modules";
import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function Page() {
  const runtimeModule = coreERPModules.find(
    (module) => module.metadata.key === "paiements"
  );

  if (!runtimeModule) {
    return null;
  }

  return (
    <ERPModuleActionPageTemplate
      module={runtimeModule}
      type="workflows"
    />
  );
}