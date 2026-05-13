import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function CulturesExportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="cultures"
      action="export"
    />
  );
}