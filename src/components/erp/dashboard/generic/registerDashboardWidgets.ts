import {
  ERPDashboardWidgetRegistry,
}
from "./registry/ERPDashboardWidgetRegistry";

import {
  ERPKPIWidget,
}
from "./widgets/ERPKPIWidget";

import {
  ERPListWidget,
}
from "./widgets/ERPListWidget";

export function registerDashboardWidgets() {

  ERPDashboardWidgetRegistry.register(
    "kpi",
    ERPKPIWidget
  );

  ERPDashboardWidgetRegistry.register(
    "alert",
    ERPListWidget
  );

  ERPDashboardWidgetRegistry.register(
    "timeline",
    ERPListWidget
  );
}