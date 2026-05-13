import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function FacturesRelationsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="factures"
      action="relations"
    />
  );
}