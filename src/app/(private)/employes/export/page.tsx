import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function EmployesExportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="employes"
      action="export"
    />
  );
}