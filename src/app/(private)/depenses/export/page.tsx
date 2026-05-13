import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function DepensesExportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="depenses"
      action="export"
    />
  );
}