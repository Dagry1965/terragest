import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function RecoltesRelationsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="recoltes"
      action="relations"
    />
  );
}