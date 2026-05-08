import { ERPRuntimePage } from "@/components/erp/runtime";
import { coreERPModules } from "@/runtime/modules";
import type { ERPModule } from "@/runtime/modules";

interface GenericListPageProps {
  module?: ERPModule;
  moduleKey?: string;
  data?: Record<string, unknown>[];
}

export function GenericListPage({
  module,
  moduleKey,
  data = [],
}: GenericListPageProps) {
  const runtimeModule =
    module ??
    coreERPModules.find((item) => item.metadata.key === moduleKey);

  return <ERPRuntimePage module={runtimeModule} data={data} type="list" />;
}