import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function FacturationsAuditPage() {
  return (
    <ERPModuleActionPageTemplate
      module="facturations"
      type="audit"
      actionLabel="Audit"
    />
  );
}