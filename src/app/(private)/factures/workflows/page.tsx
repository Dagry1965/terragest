import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function FacturesWorkflowsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="factures"
      action="workflows"
    />
  );
}