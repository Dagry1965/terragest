import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function StocksautoExportPage() {
  return (
    <ERPModuleActionPageTemplate
      module="stocksauto"
      type="export"
      actionLabel="Export"
    />
  );
}