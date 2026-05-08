import { ERPRuntimePage } from "@/components/erp/runtime";
import { coreERPModules } from "@/runtime/modules";
import type { ERPModule } from "@/runtime/modules";

interface GenericDetailPageProps {
  module?: ERPModule;
  moduleKey?: string;
  id?: string;
  record?: Record<string, unknown>;
}

export function GenericDetailPage({
  module,
  moduleKey,
  id,
  record,
}: GenericDetailPageProps) {
  const runtimeModule =
    module ??
    coreERPModules.find((item) => item.metadata.key === moduleKey);

  return (
    <ERPRuntimePage
      module={runtimeModule}
      type="details"
      record={{
        id,
        ...record,
      }}
    />
  );
}