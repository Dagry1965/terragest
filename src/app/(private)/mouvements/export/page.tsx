import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function MouvementsExportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="mouvements"
      action="export"
    />
  );
}