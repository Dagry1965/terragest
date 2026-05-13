import { ERPModuleActionPageTemplate } from "@/components/erp/generic/ERPModuleActionPageTemplate";

export const dynamic = "force-dynamic";

export default function StocksExportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="stocks"
      action="export"
    />
  );
}