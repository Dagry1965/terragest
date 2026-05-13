import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function MaintenanceAuditPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="maintenance"
      action="audit"
    />
  );
}