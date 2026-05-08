import { ERPRuntimePage } from "@/components/erp/runtime";
import {
  ERPModuleRegistry,
  coreERPModules,
  registerCoreModules,
} from "@/runtime/modules";

interface RuntimeModulePageProps {
  params: Promise<{
    module: string;
  }>;
}

export default async function RuntimeModulePage({
  params,
}: RuntimeModulePageProps) {
  const resolvedParams = await params;

  registerCoreModules();

  const runtimeModule =
    ERPModuleRegistry.get(resolvedParams.module) ??
    coreERPModules.find(
      (item) => item.metadata.key === resolvedParams.module
    );

  return (
    <main className="p-8">
      <ERPRuntimePage module={runtimeModule} />
    </main>
  );
}
