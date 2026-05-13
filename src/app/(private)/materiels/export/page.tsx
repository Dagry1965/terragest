import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function MaterielsExportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="materiels"
      action="export"
    />
  );
}