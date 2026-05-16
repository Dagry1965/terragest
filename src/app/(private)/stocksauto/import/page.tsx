import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function StocksautoImportPage() {
  return (
    <ERPModuleActionPageTemplate
      module="stocksauto"
      type="import"
      actionLabel="Import"
    />
  );
}