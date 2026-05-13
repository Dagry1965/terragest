import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function RecoltesWorkflowsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="recoltes"
      action="workflows"
    />
  );
}