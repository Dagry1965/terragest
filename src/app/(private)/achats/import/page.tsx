import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function AchatsImportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="achats"
      action="import"
    />
  );
}