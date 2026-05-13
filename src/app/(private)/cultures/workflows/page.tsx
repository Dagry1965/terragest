import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function CulturesWorkflowsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="cultures"
      action="workflows"
    />
  );
}