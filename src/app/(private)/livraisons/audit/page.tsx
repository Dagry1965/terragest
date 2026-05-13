import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function LivraisonsAuditPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="livraisons"
      action="audit"
    />
  );
}