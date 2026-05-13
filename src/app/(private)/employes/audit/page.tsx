import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function EmployesAuditPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="employes"
      action="audit"
    />
  );
}