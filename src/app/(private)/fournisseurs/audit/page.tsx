import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function FournisseursAuditPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="fournisseurs"
      action="audit"
    />
  );
}