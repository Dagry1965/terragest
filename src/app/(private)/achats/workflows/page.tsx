import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function AchatsWorkflowsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="achats"
      action="workflows"
    />
  );
}