import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function VehiculesAuditPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="vehicules"
      action="audit"
    />
  );
}