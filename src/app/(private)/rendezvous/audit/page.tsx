import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function RendezvousAuditPage() {
  return (
    <ERPModuleActionPageTemplate
      module="rendezvous"
      type="audit"
      actionLabel="Audit"
    />
  );
}