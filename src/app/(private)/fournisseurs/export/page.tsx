import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function FournisseursExportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="fournisseurs"
      action="export"
    />
  );
}