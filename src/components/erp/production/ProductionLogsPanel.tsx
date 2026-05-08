import { ERPBadge } from "@/components/erp/ui";
import { ProductionLogger } from "@/runtime/production";

export function ProductionLogsPanel() {
  const logs = ProductionLogger.all().slice(0, 8);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-950">Logs runtime</h2>
          <p className="mt-1 text-sm text-slate-500">
            Journal structure production.
          </p>
        </div>

        <ERPBadge tone="info">{logs.length}</ERPBadge>
      </div>

      <div className="space-y-3">
        {logs.length === 0 ? (
          <p className="text-sm text-slate-500">Aucun log pour le moment.</p>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-slate-900">
                    {log.scope}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{log.message}</p>
                </div>

                <ERPBadge
                  tone={
                    log.level === "error"
                      ? "danger"
                      : log.level === "warning"
                      ? "warning"
                      : "success"
                  }
                >
                  {log.level}
                </ERPBadge>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
