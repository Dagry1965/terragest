import type { ERPModule } from "@/runtime/modules";
import { ERPRuntimeTable } from "@/components/erp/runtime/ERPRuntimeTable";

interface ERPModuleListRendererProps {
  module: ERPModule;
}

export function ERPModuleListRenderer({
  module,
}: ERPModuleListRendererProps) {
  return (
    <ERPRuntimeTable
      module={module}
      data={[]}
    />
  );
}