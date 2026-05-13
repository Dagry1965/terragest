import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function CommandesImportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="commandes"
      action="import"
    />
  );
}