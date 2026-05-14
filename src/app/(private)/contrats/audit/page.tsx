import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function ContratsAuditPage() {
  return (
    <ERPModuleActionPageTemplate
      module="contrats"
      type="audit"
      actionLabel="Audit"
    />
  );
}