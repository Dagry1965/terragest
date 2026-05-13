import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function ClientsImportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="clients"
      action="import"
    />
  );
}