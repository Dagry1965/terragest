import type { ERPModule } from "@/runtime/modules";
import { ERPEnterpriseDataTable } from "@/components/erp/datatable/ERPEnterpriseDataTable";
import { ERPModuleHeader } from "./ERPModuleHeader";
import { ERPModuleKpiGrid } from "./ERPModuleKpiGrid";
import { ERPModuleTabs } from "./ERPModuleTabs";
import { ERPModuleActivityPanel } from "./ERPModuleActivityPanel";
import { ERPModuleWorkflowPanel } from "./ERPModuleWorkflowPanel";

interface ERPModuleListTemplateProps {
  module: ERPModule;
  data?: Record<string, unknown>[];
}

export function ERPModuleListTemplate({
  module,
  data = [],
}: ERPModuleListTemplateProps) {
  return (
    <div className="space-y-8">
      <ERPModuleHeader module={module} />
      <ERPModuleKpiGrid module={module} />
      <ERPModuleTabs module={module} />

      <section className="grid gap-8 xl:grid-cols-[1fr_360px]">
        <ERPEnterpriseDataTable module={module} data={data} />

        <aside className="space-y-6">
          <ERPModuleWorkflowPanel module={module} />
          <ERPModuleActivityPanel module={module} />
        </aside>
      </section>
    </div>
  );
}