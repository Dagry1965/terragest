import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function MouvementsstockautoAuditPage() {
  return (
    <ERPModuleActionPageTemplate
      module="mouvementsstockauto"
      type="audit"
      actionLabel="Audit"
    />
  );
}