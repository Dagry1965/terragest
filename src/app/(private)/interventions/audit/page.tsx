import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function InterventionsAuditPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="interventions"
      action="audit"
    />
  );
}