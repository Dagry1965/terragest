import Link from "next/link";

import type {
  ERPDashboardWidgetProps,
} from "../registry/ERPDashboardWidgetRegistry";

function formatPercent(value?: number): string {
  if (value === undefined) {
    return "Départ";
  }

  return value + "%";
}

export function ERPFunnelWidget({
  widget,
}: ERPDashboardWidgetProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl xl:col-span-4">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-xl font-black text-white">
            {widget.title}
          </h2>

          {widget.description ? (
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              {widget.description}
            </p>
          ) : null}
        </div>

        <div className="rounded-2xl border border-emerald-300/30 bg-emerald-400/10 px-4 py-3 text-sm font-black text-emerald-200">
          Conversion globale : {widget.value ?? 0}{widget.valueSuffix ?? "%"}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        {(widget.steps ?? []).map((step, index) => {
          const content = (
            <div className="h-full rounded-3xl border border-white/10 bg-black/20 p-5 transition hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-emerald-400/10">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
                Étape {index + 1}
              </p>

              <h3 className="mt-3 text-base font-black text-white">
                {step.label}
              </h3>

              <p className="mt-4 text-4xl font-black text-white">
                {step.value}
              </p>

              <p className="mt-3 text-sm font-bold text-slate-500">
                {formatPercent(step.conversionRate)}
              </p>
            </div>
          );

          if (step.href) {
            return (
              <Link
                key={step.key}
                href={step.href}
              >
                {content}
              </Link>
            );
          }

          return (
            <div key={step.key}>
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
