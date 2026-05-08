import { ERPBadge } from "@/components/erp/ui";
import { ERPUserContextProvider } from "@/runtime/os-enterprise";

export function ERPWorkspaceSwitcher() {
  const context = ERPUserContextProvider.current();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-black text-slate-950">
        Workspace
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Contexte utilisateur courant.
      </p>

      <div className="mt-5 space-y-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase text-slate-400">
            Utilisateur
          </p>
          <p className="mt-1 text-sm font-black text-slate-950">
            {context.userName}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase text-slate-400">
            Role
          </p>
          <p className="mt-1 text-sm font-black text-slate-950">
            {context.role}
          </p>
        </div>

        <ERPBadge tone="success">
          Mode {context.workspaceMode}
        </ERPBadge>
      </div>
    </section>
  );
}