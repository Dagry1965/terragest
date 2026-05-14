import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function CampagnesExportPage() {
  return (
    <ERPModuleActionPageTemplate
      module="campagnes"
      type="export"
      actionLabel="Export"
    />
  );
}