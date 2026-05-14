import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function FacturationsImportPage() {
  return (
    <ERPModuleActionPageTemplate
      module="facturations"
      type="import"
      actionLabel="Import"
    />
  );
}