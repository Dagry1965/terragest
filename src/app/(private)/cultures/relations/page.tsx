import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function CulturesRelationsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="cultures"
      action="relations"
    />
  );
}