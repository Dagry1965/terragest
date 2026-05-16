import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function StocksautoDashboardPage() {
  return (
    <ERPModuleActionPageTemplate
      module="stocksauto"
      type="dashboard"
      actionLabel="Dashboard"
    />
  );
}