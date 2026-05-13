import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function ContratsRelationsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="contrats"
      action="relations"
    />
  );
}