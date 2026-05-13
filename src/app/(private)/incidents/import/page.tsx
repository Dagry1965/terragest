import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function IncidentsImportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="incidents"
      action="import"
    />
  );
}