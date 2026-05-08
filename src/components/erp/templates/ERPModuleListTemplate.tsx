import type { ERPModule } from "@/runtime/modules";
import { ERPEnterpriseDataTable } from "@/components/erp/datatable/ERPEnterpriseDataTable";
import { ERPWorkspaceLayout } from "@/components/erp/workspace";
import { ERPModuleHeader } from "./ERPModuleHeader";
import { ERPModuleKpiGrid } from "./ERPModuleKpiGrid";

interface ERPModuleListTemplateProps {
  module: ERPModule;
  data?: Record<string, unknown>[];
}

export function ERPModuleListTemplate({
  module,
}: ERPModuleListTemplateProps) {
  return (
    <div className="space-y-8">
      <ERPModuleHeader module={module} />
      <ERPModuleKpiGrid module={module} />

      <ERPWorkspaceLayout module={module}>
        <ERPEnterpriseDataTable module={module} />
      </ERPWorkspaceLayout>
    </div>
  );
}