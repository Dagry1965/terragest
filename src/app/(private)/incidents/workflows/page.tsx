import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function IncidentsWorkflowsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="incidents"
      action="workflows"
    />
  );
}