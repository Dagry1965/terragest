import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function RecettesImportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="recettes"
      action="import"
    />
  );
}