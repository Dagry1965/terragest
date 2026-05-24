import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function fournisseursautoautoExportPage() {
  return (
    <ERPModuleActionPageTemplate
      module="fournisseursauto"
      type="export"
      actionLabel="Export"
    />
  );
}