import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function ParcellesWorkflowsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="parcelles"
      action="workflows"
    />
  );
}