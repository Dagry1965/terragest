import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function DepensesImportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="depenses"
      action="import"
    />
  );
}