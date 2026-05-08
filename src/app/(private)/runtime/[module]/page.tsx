import { ERPModuleRegistry } from "@/runtime/modules/ERPModuleRegistry";
import { registerCoreERPModules } from "@/runtime/modules/registerCoreERPModules";
import { ERPModuleListRenderer } from "@/runtime/modules/renderer/ERPModuleListRenderer";

type Props = {
  params: Promise<{
    module: string;
  }>;
};

export default async function RuntimeModulePage({ params }: Props) {
  const { module } = await params;

  registerCoreERPModules();

  const runtimeModule = ERPModuleRegistry.get(module);

  if (!runtimeModule) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold">
          Module runtime introuvable
        </h1>

        <p className="text-gray-500 mt-2">
          Le module {module} n&apos;est pas enregistré dans ERPModuleRegistry.
        </p>
      </main>
    );
  }

  return (
    <main className="p-8">
      <ERPModuleListRenderer module={runtimeModule} />
    </main>
  );
}
