import { ERPRuntimePage } from "@/components/erp/runtime";
import { coreERPModules } from "@/runtime/modules";
import type { ERPModule } from "@/runtime/modules";

interface GenericEditPageProps {
  module?: ERPModule;
  moduleKey?: string;
  id?: string;
  record?: Record<string, unknown>;
}

export function GenericEditPage({
  module,
  moduleKey,
  id,
  record,
}: GenericEditPageProps) {
  const runtimeModule =
    module ??
    coreERPModules.find((item) => item.metadata.key === moduleKey);

  return (
    <ERPRuntimePage
      module={runtimeModule}
      type="edit"
      record={{
        id,
        ...record,
      }}
    />
  );
}