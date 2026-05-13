import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function VehiculesRelationsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="vehicules"
      action="relations"
    />
  );
}