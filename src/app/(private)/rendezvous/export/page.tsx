import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function RendezvousExportPage() {
  return (
    <ERPModuleActionPageTemplate
      module="rendezvous"
      type="export"
      actionLabel="Export"
    />
  );
}