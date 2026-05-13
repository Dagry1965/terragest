import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function TachesAuditPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="taches"
      action="audit"
    />
  );
}