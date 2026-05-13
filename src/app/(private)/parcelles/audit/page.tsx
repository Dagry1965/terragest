import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function ParcellesAuditPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="parcelles"
      action="audit"
    />
  );
}