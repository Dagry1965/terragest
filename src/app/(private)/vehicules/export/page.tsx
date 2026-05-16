import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function VehiculesExportPage() {
  return (
    <ERPModuleActionPageTemplate
      module="vehicules"
      type="export"
      actionLabel="Export"
    />
  );
}