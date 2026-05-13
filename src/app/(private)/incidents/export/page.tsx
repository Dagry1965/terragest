import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function IncidentsExportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="incidents"
      action="export"
    />
  );
}