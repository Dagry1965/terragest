import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function DepensesAuditPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="depenses"
      action="audit"
    />
  );
}