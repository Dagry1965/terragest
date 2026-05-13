import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function AchatsRelationsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="achats"
      action="relations"
    />
  );
}