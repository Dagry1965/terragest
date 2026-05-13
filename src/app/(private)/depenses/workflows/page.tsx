import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function DepensesWorkflowsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="depenses"
      action="workflows"
    />
  );
}