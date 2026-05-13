import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function TachesWorkflowsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="taches"
      action="workflows"
    />
  );
}