import type { ERPModule } from "@/runtime/modules";
import { allERPModules } from "@/runtime/modules/definitions/coreModules";
import { ERPRuntimePage } from "@/components/erp/runtime/ERPRuntimePage";

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
    allERPModules.find((item) => item.metadata.key === moduleKey);

  return <ERPRuntimePage module={runtimeModule} type="create" />;
}