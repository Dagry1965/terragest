"use client";

import type {
  ERPModule,
  ERPOperationalRightPanelMetricConfig,
} from "@/runtime/modules/ERPModule";

type ERPOperationalRightPanelProps = {
  module: ERPModule;
  data: Record<string, unknown>[];
};

function getRecordNumber(
  record: Record<string, unknown>,
  field?: string
): number {
  if (!field) return 0;

  const value = record[field];

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value === "string") {
    const normalized = value.replace(/\s/g, "").replace(",", ".");
    const parsed = Number(normalized);

    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

function matchesMetricFilter(
  record: Record<string, unknown>,
  metric: ERPOperationalRightPanelMetricConfig
): boolean {
  if (!metric.field) {
    return true;
  }

  if (!Object.prototype.hasOwnProperty.call(metric, "equals")) {
    return true;
  }

  return String(record[metric.field] ?? "") === String(metric.equals ?? "");
}

function resolveMetricValue(
  data: Record<string, unknown>[],
  metric: ERPOperationalRightPanelMetricConfig
): number {
  if (metric.type === "count") {
    return data.length;
  }

  if (metric.type === "countWhere") {
    return data.filter((record) => matchesMetricFilter(record, metric)).length;
  }

  if (metric.type === "sum") {
    return data.reduce(
      (total, record) => total + getRecordNumber(record, metric.field),
      0
    );
  }

  if (metric.type === "average") {
    const values = data
      .map((record) => getRecordNumber(record, metric.field))
      .filter((value) => Number.isFinite(value));

    if (values.length === 0) {
      return 0;
    }

    return values.reduce((total, value) => total + value, 0) / values.length;
  }

  return 0;
}

function formatMetricValue(
  value: number,
  metric: ERPOperationalRightPanelMetricConfig
): string {
  if (metric.format === "currency") {
    const formatted = new Intl.NumberFormat("fr-FR", {
      maximumFractionDigits: 0,
    }).format(value);

    return metric.currency ? `${formatted} ${metric.currency}` : formatted;
  }

  if (metric.format === "percent") {
    return `${new Intl.NumberFormat("fr-FR", {
      maximumFractionDigits: 1,
    }).format(value)} %`;
  }

  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 1,
  }).format(value);
}

function getDefaultMetrics(): ERPOperationalRightPanelMetricConfig[] {
  return [
    {
      key: "total",
      label: "Total affiché",
      type: "count",
      format: "number",
    },
  ];
}

export function ERPOperationalRightPanel({
  module,
  data,
}: ERPOperationalRightPanelProps) {
  const panel = module.operational?.rightPanel;

  if (!panel?.enabled) {
    return null;
  }

  const metrics = panel.metrics?.length ? panel.metrics : getDefaultMetrics();

  return (
    <aside className="rounded-[1.7rem] border border-amber-100 bg-[#FFF9EA] p-5 text-[#10251C] shadow-[0_18px_55px_rgba(146,99,12,0.10)]">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-amber-700">
          {panel.type ?? "summary"}
        </p>

        <h2 className="mt-2 text-xl font-black">
          {panel.title ?? "Panneau opérationnel"}
        </h2>

        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
          Synthèse runtime liée au module {module.metadata.label}.
        </p>
      </div>

      <div className="mt-5 grid gap-3">
        {metrics.map((metric) => {
          const value = resolveMetricValue(data, metric);

          return (
            <div
              key={metric.key}
              className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm"
            >
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                {metric.label}
              </p>

              <p className="mt-2 text-2xl font-black text-[#10251C]">
                {formatMetricValue(value, metric)}
              </p>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
