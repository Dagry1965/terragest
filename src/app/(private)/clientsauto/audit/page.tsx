import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function ClientsautoAuditPage() {
  return (
    <ERPModuleActionPageTemplate
      module="clientsauto"
      type="audit"
      actionLabel="Audit"
    />
  );
}