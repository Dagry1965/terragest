import type { ERPModule } from "@/runtime/modules";
import { ERPUIComposer } from "@/runtime/ui/ERPUIComposition";

interface ERPModuleKpiGridProps {
  module: ERPModule;
}

export function ERPModuleKpiGrid({ module }: ERPModuleKpiGridProps) {
  const composition = ERPUIComposer.compose(module);

  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {composition.kpis.map((kpi) => (
        <div
          key={`${module.metadata.key}-${kpi.label}`}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <p className="text-sm font-bold text-slate-500">{kpi.label}</p>
          <p className="mt-3 text-4xl font-black tracking-tight text-slate-950">
            {kpi.value}
          </p>
          <p className="mt-2 text-sm text-slate-400">{kpi.helper}</p>
        </div>
      ))}
    </section>
  );
}