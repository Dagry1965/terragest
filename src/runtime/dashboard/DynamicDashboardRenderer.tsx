"use client";

import {
  createDashboardWidget,
} from "./DashboardWidgetFactory";

import type {
  ERPDashboardRuntimeConfig,
} from "./DashboardConfigReader";

type DynamicDashboardRendererProps = {
  config: ERPDashboardRuntimeConfig;
};

export function DynamicDashboardRenderer({
  config,
}: DynamicDashboardRendererProps) {

  return (

    <div className="space-y-6">

      <div>
        <h2 className="text-2xl font-semibold">
          {config.label}
        </h2>

        <p className="text-sm text-slate-500">
          Dashboard runtime généré automatiquement.
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-1
          gap-4
          md:grid-cols-2
          xl:grid-cols-3
        "
      >

        {config.widgets.map((widget) => (

          <div key={widget}>
            {
              createDashboardWidget(
                widget,
                config.moduleKey
              )
            }
          </div>

        ))}

      </div>

    </div>
  );
}