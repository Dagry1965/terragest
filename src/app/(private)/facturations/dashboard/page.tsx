import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function FacturationsDashboardPage() {
  return (
    <ERPModuleActionPageTemplate
      module="facturations"
      type="dashboard"
      actionLabel="Dashboard"
    />
  );
}