import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function ParcellesRelationsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="parcelles"
      action="relations"
    />
  );
}