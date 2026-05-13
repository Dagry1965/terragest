import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function AchatsAuditPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="achats"
      action="audit"
    />
  );
}