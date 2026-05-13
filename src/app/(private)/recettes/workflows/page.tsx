import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function RecettesWorkflowsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="recettes"
      action="workflows"
    />
  );
}