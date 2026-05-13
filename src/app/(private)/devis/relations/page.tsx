import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function DevisRelationsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="devis"
      action="relations"
    />
  );
}