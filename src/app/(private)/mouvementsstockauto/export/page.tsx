import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function MouvementsstockautoExportPage() {
  return (
    <ERPModuleActionPageTemplate
      module="mouvementsstockauto"
      type="export"
      actionLabel="Export"
    />
  );
}