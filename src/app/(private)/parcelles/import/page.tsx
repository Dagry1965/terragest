import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function ParcellesImportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="parcelles"
      action="import"
    />
  );
}