import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function ClientsautoExportPage() {
  return (
    <ERPModuleActionPageTemplate
      module="clientsauto"
      type="export"
      actionLabel="Export"
    />
  );
}