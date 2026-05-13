import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function ClientsAuditPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="clients"
      action="audit"
    />
  );
}