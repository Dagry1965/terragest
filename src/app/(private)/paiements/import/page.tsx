import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function PaiementsImportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="paiements"
      action="import"
    />
  );
}