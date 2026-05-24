import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function commandesstockautoautoExportPage() {
  return (
    <ERPModuleActionPageTemplate
      module="commandesstockauto"
      type="export"
      actionLabel="Export"
    />
  );
}