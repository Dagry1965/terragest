import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function VehiculesExportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="vehicules"
      action="export"
    />
  );
}