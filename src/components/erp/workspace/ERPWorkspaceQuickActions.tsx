import { ERPActionToolbar } from "@/components/erp/actions";
import { ERPActionRegistry } from "@/runtime/actions";
import type { ERPModule } from "@/runtime/modules";

interface ERPWorkspaceQuickActionsProps {
  module: ERPModule;
}

export function ERPWorkspaceQuickActions({
  module,
}: ERPWorkspaceQuickActionsProps) {
  const actions = ERPActionRegistry.forModule(module);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-black text-slate-950">
          Actions rapides
        </h2>
        <p className="text-sm text-slate-500">
          Raccourcis issus du registre central.
        </p>
      </div>

      <ERPActionToolbar actions={actions} />
    </section>
  );
}