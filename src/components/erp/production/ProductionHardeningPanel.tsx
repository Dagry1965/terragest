import { RuntimeHealthPanel } from "./RuntimeHealthPanel";
import { ProductionLogsPanel } from "./ProductionLogsPanel";
import { ProductionReadinessPanel } from "./ProductionReadinessPanel";

export function ProductionHardeningPanel() {
  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-950">
          Production hardening
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Protections runtime, monitoring, cache, readiness et stabilisation.
        </p>
      </div>

      <section className="grid gap-6 xl:grid-cols-3">
        <RuntimeHealthPanel />
        <ProductionReadinessPanel />
        <ProductionLogsPanel />
      </section>
    </section>
  );
}