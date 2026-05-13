import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function ContratsAuditPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="contrats"
      action="audit"
    />
  );
}