import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function IntrantsWorkflowsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="intrants"
      action="workflows"
    />
  );
}