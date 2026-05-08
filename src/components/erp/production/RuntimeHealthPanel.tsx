import { ERPBadge } from "@/components/erp/ui";
import { RuntimeHealthMonitor } from "@/runtime/production";

export function RuntimeHealthPanel() {
  const health = RuntimeHealthMonitor.check();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-950">
            Health runtime
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Surveillance production globale.
          </p>
        </div>

        <ERPBadge tone={health.status === "healthy" ? "success" : "warning"}>
          {health.status}
        </ERPBadge>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase text-slate-400">
            Logs
          </p>
          <p className="mt-1 text-2xl font-black text-slate-950">
            {health.logs}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase text-slate-400">
            Erreurs
          </p>
          <p className="mt-1 text-2xl font-black text-slate-950">
            {health.errors}
          </p>
        </div>
      </div>
    </section>
  );
}