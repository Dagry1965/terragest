import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function fournisseursautoautoAuditPage() {
  return (
    <ERPModuleActionPageTemplate
      module="fournisseursauto"
      type="audit"
      actionLabel="Audit"
    />
  );
}