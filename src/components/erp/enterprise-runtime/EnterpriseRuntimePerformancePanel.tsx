import { EnterpriseRuntimePerformance } from "@/runtime/enterprise-runtime";

export function EnterpriseRuntimePerformancePanel() {
  const metrics = EnterpriseRuntimePerformance.metrics();

  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <p className="text-sm font-bold text-slate-500">{metric.label}</p>
          <p className="mt-3 text-4xl font-black text-slate-950">
            {metric.value}
          </p>
          <p className="mt-2 text-sm text-slate-400">{metric.helper}</p>
        </div>
      ))}
    </section>
  );
}