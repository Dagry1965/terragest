import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function IntrantsImportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="intrants"
      action="import"
    />
  );
}