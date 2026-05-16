import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function VehiculesAuditPage() {
  return (
    <ERPModuleActionPageTemplate
      module="vehicules"
      type="audit"
      actionLabel="Audit"
    />
  );
}