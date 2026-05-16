import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function FacturesautoAuditPage() {
  return (
    <ERPModuleActionPageTemplate
      module="facturesauto"
      type="audit"
      actionLabel="Audit"
    />
  );
}