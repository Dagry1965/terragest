import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function IncidentsRelationsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="incidents"
      action="relations"
    />
  );
}