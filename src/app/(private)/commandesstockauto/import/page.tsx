import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function commandesstockautoautoImportPage() {
  return (
    <ERPModuleActionPageTemplate
      module="commandesstockauto"
      type="import"
      actionLabel="Import"
    />
  );
}