import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function ClientsRelationsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="clients"
      action="relations"
    />
  );
}