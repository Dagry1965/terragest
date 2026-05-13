import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function InterventionsRelationsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="interventions"
      action="relations"
    />
  );
}