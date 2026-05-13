import React from "react";

import type {
  ERPDashboardWidgetType,
} from "./DashboardConfigReader";

type DashboardWidgetProps = {
  moduleKey: string;
};

function KPIWidget({
  moduleKey,
}: DashboardWidgetProps) {
  return (
    <div className="rounded-2xl border p-4">
      KPI Widget — {moduleKey}
    </div>
  );
}

function TimelineWidget({
  moduleKey,
}: DashboardWidgetProps) {
  return (
    <div className="rounded-2xl border p-4">
      Timeline Widget — {moduleKey}
    </div>
  );
}

function ActivityWidget({
  moduleKey,
}: DashboardWidgetProps) {
  return (
    <div className="rounded-2xl border p-4">
      Activity Widget — {moduleKey}
    </div>
  );
}

function StatusDistributionWidget({
  moduleKey,
}: DashboardWidgetProps) {
  return (
    <div className="rounded-2xl border p-4">
      Status Distribution — {moduleKey}
    </div>
  );
}

export function createDashboardWidget(
  widget: ERPDashboardWidgetType,
  moduleKey: string
) {

  switch (widget) {

    case "kpi":
      return (
        <KPIWidget
          moduleKey={moduleKey}
        />
      );

    case "timeline":
      return (
        <TimelineWidget
          moduleKey={moduleKey}
        />
      );

    case "activity":
      return (
        <ActivityWidget
          moduleKey={moduleKey}
        />
      );

    case "status-distribution":
      return (
        <StatusDistributionWidget
          moduleKey={moduleKey}
        />
      );

    default:
      return (
        <div className="rounded-2xl border border-red-500 p-4">
          Unknown widget: {widget}
        </div>
      );
  }
}