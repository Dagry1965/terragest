"use client";

import {
  useEffect,
}
from "react";

import type {
  ERPDashboardConfig,
  ERPDashboardWidgetResult,
}
from "@/runtime/dashboard/generic/ERPDashboardTypes";

import {
  registerDashboardWidgets,
}
from "./registerDashboardWidgets";

import {
  ERPDashboardWidgetRegistry,
}
from "./registry/ERPDashboardWidgetRegistry";

interface Props {

  config:
    ERPDashboardConfig;

  widgets:
    ERPDashboardWidgetResult[];
}

export function ERPDashboardRenderer({
  config,
  widgets,
}: Props) {

  useEffect(() => {

    registerDashboardWidgets();

  }, []);

  return (

    <main
      className="
        space-y-8
        p-8
      "
    >

      <section
        className="
          rounded-3xl
          border
          bg-white
          p-8
          shadow-sm
        "
      >

        <p
          className="
            text-sm
            font-medium
            text-emerald-700
          "
        >
          Tableau de bord ERP
        </p>

        <h1
          className="
            mt-2
            text-3xl
            font-bold
            text-slate-950
          "
        >
          {config.title}
        </h1>

        {config.subtitle ? (

          <p
            className="
              mt-3
              max-w-3xl
              text-slate-600
            "
          >
            {config.subtitle}
          </p>

        ) : null}

      </section>

      <section
        className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-3
        "
      >

        {widgets.map(
          (widget) => {

            const Component =
              ERPDashboardWidgetRegistry
                .get(
                  widget.type
                );

            if (!Component) {

              return (

                <div
                  key={widget.key}
                >
                  Widget inconnu :
                  {widget.type}
                </div>
              );
            }

            return (

              <Component
                key={widget.key}
                widget={widget}
              />
            );
          }
        )}

      </section>

    </main>
  );
}