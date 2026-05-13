import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function IntrantsAuditPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="intrants"
      action="audit"
    />
  );
}