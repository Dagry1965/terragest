import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function ClientsWorkflowsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="clients"
      action="workflows"
    />
  );
}