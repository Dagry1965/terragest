import type {
  ComponentType,
}
from "react";

import type {
  ERPDashboardWidgetResult,
}
from "@/runtime/dashboard/generic/ERPDashboardTypes";

export interface ERPDashboardWidgetProps {
  widget:
    ERPDashboardWidgetResult;
}

export class ERPDashboardWidgetRegistry {

  private static widgets:
    Record<
      string,
      ComponentType<
        ERPDashboardWidgetProps
      >
    > = {};

  static register(
    type: string,

    component:
      ComponentType<
        ERPDashboardWidgetProps
      >
  ) {

    this.widgets[type] =
      component;
  }

  static get(
    type: string
  ) {

    return (
      this.widgets[type]
      ?? null
    );
  }
}