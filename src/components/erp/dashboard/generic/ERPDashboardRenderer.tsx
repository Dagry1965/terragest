"use client";

import type {
  ERPDashboardConfig,
  ERPDashboardWidgetResult,
} from "@/runtime/dashboard/generic/ERPDashboardTypes";

import {
  registerDashboardWidgets,
} from "./registerDashboardWidgets";

import {
  ERPDashboardWidgetRegistry,
} from "./registry/ERPDashboardWidgetRegistry";

interface Props {
  config: ERPDashboardConfig;
  widgets: ERPDashboardWidgetResult[];
}

registerDashboardWidgets();

function getWidgetSpanClassName(
  widget: ERPDashboardWidgetResult
): string {
  if (widget.type === "funnel") {
    return "md:col-span-2 xl:col-span-4";
  }

  if (widget.type === "quickActions") {
    return "md:col-span-2 xl:col-span-2";
  }

  if (
    widget.type === "alert" ||
    widget.type === "timeline" ||
    widget.type === "activity"
  ) {
    return "md:col-span-2 xl:col-span-2";
  }

  return "";
}

export function ERPDashboardRenderer({
  config,
  widgets,
}: Props) {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-50 md:px-8 md:py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-emerald-400/[0.06] p-6 shadow-2xl md:p-8">
          <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="absolute -bottom-20 left-12 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-emerald-300">
                Tableau de bord métier
              </p>

              <h1 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
                {config.title}
              </h1>

              {config.subtitle ? (
                <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300 md:text-base">
                  {config.subtitle}
                </p>
              ) : null}
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-300">
              {widgets.length.toLocaleString("fr-FR")} widgets actifs
            </div>
          </div>
        </section>

        <section className="grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-4">
          {widgets.map((widget) => {
            const Component =
              ERPDashboardWidgetRegistry.get(widget.type);

            if (!Component) {
              return (
                <div
                  key={widget.key}
                  className="rounded-3xl border border-red-400/30 bg-red-500/10 p-5 text-sm font-semibold text-red-100"
                >
                  Widget inconnu : {widget.type}
                </div>
              );
            }

            return (
              <div
                key={widget.key}
                className={getWidgetSpanClassName(widget)}
              >
                <Component widget={widget} />
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}
