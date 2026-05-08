import { ERPRuntimePage } from "@/components/erp/runtime";
import { coreERPModules } from "@/runtime/modules";
import type { ERPModule } from "@/runtime/modules";

interface GenericCreatePageProps {
  module?: ERPModule;
  moduleKey?: string;
}

export function GenericCreatePage({
  module,
  moduleKey,
}: GenericCreatePageProps) {
  const runtimeModule =
    module ??
    coreERPModules.find((item) => item.metadata.key === moduleKey);

  return <ERPRuntimePage module={runtimeModule} type="create" />;
}