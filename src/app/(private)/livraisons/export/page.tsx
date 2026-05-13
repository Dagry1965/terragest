import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function LivraisonsExportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="livraisons"
      action="export"
    />
  );
}