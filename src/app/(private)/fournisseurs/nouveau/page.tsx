import { GenericCreatePage } from "@/components/erp/generic/GenericCreatePage";
import { coreERPModules } from "@/runtime/modules/definitions/coreModules";
import type { ERPModule } from "@/runtime/modules/ERPModule";

export default function CreateFournisseursPage() {
  const erpModule = coreERPModules.find(
    (item) => item.metadata.key === "fournisseurs"
  ) as ERPModule | undefined;

  if (!erpModule) {
    throw new Error("Module fournisseurs introuvable");
  }

  return <GenericCreatePage module={erpModule} />;
}