import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function LivraisonsImportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="livraisons"
      action="import"
    />
  );
}