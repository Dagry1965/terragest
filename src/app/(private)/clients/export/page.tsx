import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function ClientsExportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="clients"
      action="export"
    />
  );
}