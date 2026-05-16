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

/**
 * Register widgets synchronously before rendering.
 * Do not use useEffect here, otherwise the first render sees an empty registry.
 */
registerDashboardWidgets();

export function ERPDashboardRenderer({
  config,
  widgets,
}: Props) {
  return (
    <main className="space-y-8 p-8">
      <section className="rounded-3xl border bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-emerald-700">
          Tableau de bord ERP
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          {config.title}
        </h1>

        {config.subtitle ? (
          <p className="mt-3 max-w-3xl text-slate-600">
            {config.subtitle}
          </p>
        ) : null}
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {widgets.map((widget) => {
          const Component =
            ERPDashboardWidgetRegistry.get(widget.type);

          if (!Component) {
            return (
              <div
                key={widget.key}
                className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-semibold text-red-700"
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