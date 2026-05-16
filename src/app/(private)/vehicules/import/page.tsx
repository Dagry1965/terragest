import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function VehiculesImportPage() {
  return (
    <ERPModuleActionPageTemplate
      module="vehicules"
      type="import"
      actionLabel="Import"
    />
  );
}