import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function ParcellesExportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="parcelles"
      action="export"
    />
  );
}