import { ERPBadge } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";

interface ERPWorkspaceActivityProps {
  module: ERPModule;
}

export function ERPWorkspaceActivity({ module }: ERPWorkspaceActivityProps) {
  const items = [
    "Nouvelle action metier enregistree",
    "Controle de coherence effectue",
    "Workflow disponible pour validation",
    "Mise a jour operationnelle detectee",
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-950">
            Activite workspace
          </h2>
          <p className="text-sm text-slate-500">
            Flux recent du module {module.metadata.label}.
          </p>
        </div>

        <ERPBadge tone="info">Live</ERPBadge>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item} className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-bold text-slate-800">{item}</p>
            <p className="mt-1 text-xs text-slate-400">Mis a jour recemment</p>
          </div>
        ))}
      </div>
    </section>
  );
}