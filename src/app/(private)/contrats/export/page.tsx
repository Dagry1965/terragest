import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function ContratsExportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="contrats"
      action="export"
    />
  );
}