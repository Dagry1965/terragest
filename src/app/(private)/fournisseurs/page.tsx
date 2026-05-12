import { GenericListPage } from "@/components/erp/generic/GenericListPage";
import { coreERPModules } from "@/runtime/modules/definitions/coreModules";
import type { ERPModule } from "@/runtime/modules/ERPModule";

export default function FournisseursPage() {
  const erpModule = coreERPModules.find(
    (item) => item.metadata.key === "fournisseurs"
  ) as ERPModule | undefined;

  if (!erpModule) {
    throw new Error("Module fournisseurs introuvable");
  }

  return <GenericListPage module={erpModule} />;
}