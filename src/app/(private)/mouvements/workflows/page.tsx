import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function MouvementsWorkflowsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="mouvements"
      action="workflows"
    />
  );
}