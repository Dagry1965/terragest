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

export function ERPDashboardRenderer({
  config,
  widgets,
}: Props) {
  return (
    <main className="min-h-screen space-y-8 bg-slate-950 p-6 text-slate-50 md:p-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-300">
            Tableau de bord métier
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-white">
            {config.title}
          </h1>

          {config.subtitle ? (
            <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-400 md:text-base">
              {config.subtitle}
            </p>
          ) : null}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {widgets.map((widget) => {
          const Component =
            ERPDashboardWidgetRegistry.get(widget.type);

          if (!Component) {
            return (
              <div
                key={widget.key}
                className="rounded-2xl border border-red-400/30 bg-red-500/10 p-5 text-sm font-semibold text-red-100"
              >
                Widget inconnu : {widget.type}
              </div>
            );
          }

          return (
            <Component
              key={widget.key}
              widget={widget}
            />
          );
        })}
      </section>
    </main>
  );
}
