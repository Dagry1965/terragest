import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function FacturationsExportPage() {
  return (
    <ERPModuleActionPageTemplate
      module="facturations"
      type="export"
      actionLabel="Export"
    />
  );
}