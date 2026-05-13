import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function DepensesRelationsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="depenses"
      action="relations"
    />
  );
}