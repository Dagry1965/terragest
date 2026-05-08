import type { ERPModule } from "@/runtime/modules";

interface ERPLiveOperationalPanelProps {
  module: ERPModule;
}

export function ERPLiveOperationalPanel({
  module,
}: ERPLiveOperationalPanelProps) {
  return (
    <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
      <h2 className="text-lg font-black text-emerald-950">
        Supervision live
      </h2>

      <p className="mt-2 text-sm text-emerald-700">
        Le module {module.metadata.label} est suivi en mode operationnel.
      </p>
    </section>
  );
}