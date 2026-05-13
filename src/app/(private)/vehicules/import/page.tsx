import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function VehiculesImportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="vehicules"
      action="import"
    />
  );
}