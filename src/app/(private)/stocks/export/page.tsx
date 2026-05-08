import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function Page() {
  return (
    <ERPModuleActionPageTemplate
      moduleLabel="Stocks"
      type="export"
      actionLabel="Export"
      description="Page legacy stabilisee par le template ERP enterprise centralise."
    />
  );
}