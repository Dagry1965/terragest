import type { ERPRecordHubResolvedKpi } from "@/runtime/hub";

export type ERPRecordHubKpiStripProps = {
  kpis: ERPRecordHubResolvedKpi[];
};

export function ERPRecordHubKpiStrip({ kpis }: ERPRecordHubKpiStripProps) {
  if (kpis.length === 0) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => (
        <article key={kpi.key} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{kpi.label}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">{String(kpi.value)}</p>
        </article>
      ))}
    </div>
  );
}
