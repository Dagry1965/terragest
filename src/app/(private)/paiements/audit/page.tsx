import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function PaiementsAuditPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="paiements"
      action="audit"
    />
  );
}