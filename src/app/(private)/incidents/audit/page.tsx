import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function IncidentsAuditPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="incidents"
      action="audit"
    />
  );
}