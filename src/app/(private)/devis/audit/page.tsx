import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function DevisAuditPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="devis"
      action="audit"
    />
  );
}