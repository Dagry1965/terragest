import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function FournisseursRelationsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="fournisseurs"
      action="relations"
    />
  );
}