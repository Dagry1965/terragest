import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function ContratsWorkflowsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="contrats"
      action="workflows"
    />
  );
}