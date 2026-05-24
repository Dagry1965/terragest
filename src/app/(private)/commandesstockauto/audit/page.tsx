import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function commandesstockautoautoAuditPage() {
  return (
    <ERPModuleActionPageTemplate
      module="commandesstockauto"
      type="audit"
      actionLabel="Audit"
    />
  );
}