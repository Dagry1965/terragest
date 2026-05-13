import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function DevisImportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="devis"
      action="import"
    />
  );
}