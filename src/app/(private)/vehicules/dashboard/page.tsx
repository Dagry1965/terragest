import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function VehiculesDashboardPage() {
  return (
    <ERPModuleActionPageTemplate
      module="vehicules"
      type="dashboard"
      actionLabel="Dashboard"
    />
  );
}