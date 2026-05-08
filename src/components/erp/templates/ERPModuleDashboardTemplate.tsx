import type { ERPModule } from "@/runtime/modules";
import { ERPModuleHeader } from "./ERPModuleHeader";
import { ERPModuleKpiGrid } from "./ERPModuleKpiGrid";
import { ERPModuleActivityPanel } from "./ERPModuleActivityPanel";
import { ERPModuleWorkflowPanel } from "./ERPModuleWorkflowPanel";

interface ERPModuleDashboardTemplateProps {
  module: ERPModule;
}

export function ERPModuleDashboardTemplate({
  module,
}: ERPModuleDashboardTemplateProps) {
  return (
    <div className="space-y-8">
      <ERPModuleHeader module={module} />
      <ERPModuleKpiGrid module={module} />

      <section className="grid gap-8 xl:grid-cols-2">
        <ERPModuleActivityPanel module={module} />
        <ERPModuleWorkflowPanel module={module} />
      </section>
    </div>
  );
}