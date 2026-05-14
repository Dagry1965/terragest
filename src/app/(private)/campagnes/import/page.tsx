import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function CampagnesImportPage() {
  return (
    <ERPModuleActionPageTemplate
      module="campagnes"
      type="import"
      actionLabel="Import"
    />
  );
}