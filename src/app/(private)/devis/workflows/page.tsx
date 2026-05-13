import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function DevisWorkflowsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="devis"
      action="workflows"
    />
  );
}