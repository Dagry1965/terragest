import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function DevisExportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="devis"
      action="export"
    />
  );
}