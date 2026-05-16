import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function FacturesautoExportPage() {
  return (
    <ERPModuleActionPageTemplate
      module="facturesauto"
      type="export"
      actionLabel="Export"
    />
  );
}