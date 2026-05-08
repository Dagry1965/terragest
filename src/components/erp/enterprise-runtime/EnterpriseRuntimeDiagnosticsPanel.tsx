import { ERPBadge } from "@/components/erp/ui";
import { EnterpriseRuntimeDiagnostics } from "@/runtime/enterprise-runtime";

export function EnterpriseRuntimeDiagnosticsPanel() {
  const diagnostics = EnterpriseRuntimeDiagnostics.summary();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-950">
            Diagnostics runtime
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Etat global des couches enterprise.
          </p>
        </div>

        <ERPBadge tone="success">{diagnostics.score}%</ERPBadge>
      </div>

      <div className="space-y-3">
        {diagnostics.services.map((service) => (
          <div
            key={service.name}
            className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black text-slate-900">
                  {service.name}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {service.description}
                </p>
              </div>

              <ERPBadge
                tone={
                  service.status === "healthy"
                    ? "success"
                    : service.status === "warning"
                      ? "warning"
                      : "danger"
                }
              >
                {service.status}
              </ERPBadge>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}