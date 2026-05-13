import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function RecoltesExportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="recoltes"
      action="export"
    />
  );
}