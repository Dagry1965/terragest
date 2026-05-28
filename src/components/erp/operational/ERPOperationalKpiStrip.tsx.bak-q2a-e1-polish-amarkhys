"use client";

import type {
  ERPOperationalKpiConfig,
} from "@/runtime/modules/ERPModule";

type ERPOperationalKpiStripProps = {
  kpis?: ERPOperationalKpiConfig[];
  data: Record<string, unknown>[];
};

function getKpiValue(
  kpi: ERPOperationalKpiConfig,
  data: Record<string, unknown>[]
): number {
  if (kpi.count || !kpi.field) {
    return data.length;
  }

  return data.filter((record) => record[kpi.field ?? ""] === kpi.equals).length;
}

function getToneClass(tone?: string): string {
  switch (tone) {
    case "green":
      return "border-emerald-200 bg-emerald-50 text-emerald-800";
    case "orange":
      return "border-amber-200 bg-amber-50 text-amber-800";
    case "red":
      return "border-red-200 bg-red-50 text-red-800";
    case "purple":
      return "border-purple-200 bg-purple-50 text-purple-800";
    case "gray":
      return "border-slate-200 bg-slate-50 text-slate-700";
    case "blue":
    default:
      return "border-sky-200 bg-sky-50 text-sky-800";
  }
}

export function ERPOperationalKpiStrip({
  kpis = [],
  data,
}: ERPOperationalKpiStripProps) {
  if (kpis.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => (
        <div
          key={kpi.key}
          className={[
            "rounded-3xl border p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)]",
            getToneClass(kpi.tone),
          ].join(" ")}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] opacity-70">
                {kpi.label}
              </p>
              <p className="mt-3 text-4xl font-black tracking-tight">
                {getKpiValue(kpi, data)}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/70 text-lg font-black shadow-sm">
              {kpi.icon ? kpi.icon.slice(0, 1).toUpperCase() : "•"}
            </div>
          </div>

          {kpi.description ? (
            <p className="mt-3 text-xs font-semibold opacity-70">
              {kpi.description}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
