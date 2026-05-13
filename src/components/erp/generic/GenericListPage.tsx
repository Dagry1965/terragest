import { allERPModules } from "@/runtime/modules/definitions/coreModules";
import { ERPRuntimePage } from "@/components/erp/runtime/ERPRuntimePage";

interface GenericListPageProps {
  moduleKey: string;
}

export function GenericListPage({ moduleKey }: GenericListPageProps) {
  const runtimeModule = allERPModules.find(
    (item) => item.metadata.key === moduleKey
  );

  if (!runtimeModule) {
    return <div className="p-6">Module introuvable.</div>;
  }

  return <ERPRuntimePage module={runtimeModule} type="list" />;
}