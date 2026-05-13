import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function FacturesImportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="factures"
      action="import"
    />
  );
}