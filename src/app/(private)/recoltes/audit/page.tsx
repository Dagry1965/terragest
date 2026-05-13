import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function RecoltesAuditPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="recoltes"
      action="audit"
    />
  );
}