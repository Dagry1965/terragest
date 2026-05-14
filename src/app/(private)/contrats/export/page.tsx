import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function ContratsExportPage() {
  return (
    <ERPModuleActionPageTemplate
      module="contrats"
      type="export"
      actionLabel="Export"
    />
  );
}