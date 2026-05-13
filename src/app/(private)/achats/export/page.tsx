import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function AchatsExportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="achats"
      action="export"
    />
  );
}