import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function TachesExportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="taches"
      action="export"
    />
  );
}