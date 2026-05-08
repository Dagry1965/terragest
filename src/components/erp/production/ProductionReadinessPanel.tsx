import { ERPBadge } from "@/components/erp/ui";
import { ProductionReadiness } from "@/runtime/production";

export function ProductionReadinessPanel() {
  const checks = ProductionReadiness.checks();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-black text-slate-950">
        Production readiness
      </h2>

      <div className="mt-5 space-y-3">
        {checks.map((check) => (
          <div
            key={check.key}
            className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
          >
            <span className="text-sm font-bold text-slate-700">
              {check.label}
            </span>

            <ERPBadge
  tone={
    check.status === "ok"
      ? "success"
      : check.status === "warning"
        ? "warning"
        : "danger"
  }
>
  {check.status}
</ERPBadge>
          </div>
        ))}
      </div>
    </section>
  );
}