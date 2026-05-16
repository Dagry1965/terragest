import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function StocksautoAuditPage() {
  return (
    <ERPModuleActionPageTemplate
      module="stocksauto"
      type="audit"
      actionLabel="Audit"
    />
  );
}