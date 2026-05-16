import type {
  ERPDashboardWidgetConfig,
} from "@/runtime/dashboard/generic/ERPDashboardTypes";

import {
  ERPDashboardWidgetEngine,
} from "@/runtime/dashboard/generic/ERPDashboardWidgetEngine";

import {
  ERPWorkspaceWidgetCard,
} from "./ERPWorkspaceWidgetCard";

interface ERPWorkspaceRuntimeWidgetsProps {
  widgets: ERPDashboardWidgetConfig[];
}

export async function ERPWorkspaceRuntimeWidgets({
  widgets,
}: ERPWorkspaceRuntimeWidgetsProps) {

  const results =
    await Promise.all(
      widgets.map(
        (widget) =>
          ERPDashboardWidgetEngine.resolveWidget(
            widget
          )
      )
    );

  if (results.length === 0) {
    return null;
  }

  return (

    <section
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >

      <div className="mb-6">

        <h2
          className="
            text-lg
            font-semibold
            text-slate-950
          "
        >
          Widgets runtime
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-slate-500
          "
        >
          Widgets ERP résolus dynamiquement depuis le runtime.
        </p>

      </div>

      <div
        className="
          grid
          gap-4
          md:grid-cols-2
          xl:grid-cols-3
        "
      >

        {results.map((result) => (

          <ERPWorkspaceWidgetCard
            key={result.key}
            widget={result}
          />

        ))}

      </div>

    </section>

  );
}