import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function MaintenanceImportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="maintenance"
      action="import"
    />
  );
}