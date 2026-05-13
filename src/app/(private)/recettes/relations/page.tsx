import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function RecettesRelationsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="recettes"
      action="relations"
    />
  );
}