import { GenericDetailPage } from "@/components/erp/generic/GenericDetailPage";
import { coreERPModules } from "@/runtime/modules/definitions/coreModules";
import type { ERPModule } from "@/runtime/modules/ERPModule";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function FournisseursDetailPage({ params }: Props) {
  const { id } = await params;

  const erpModule = coreERPModules.find(
    (item) => item.metadata.key === "fournisseurs"
  ) as ERPModule | undefined;

  if (!erpModule) {
    throw new Error("Module fournisseurs introuvable");
  }

  return <GenericDetailPage module={erpModule} id={id} />;
}