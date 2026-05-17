import {
  ERPDashboardWidgetRegistry,
} from "./registry/ERPDashboardWidgetRegistry";

import {
  ERPKPIWidget,
} from "./widgets/ERPKPIWidget";

import {
  ERPListWidget,
} from "./widgets/ERPListWidget";

import {
  ERPQuickActionsWidget,
} from "./widgets/ERPQuickActionsWidget";

import {
  ERPFunnelWidget,
} from "./widgets/ERPFunnelWidget";

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

  ERPDashboardWidgetRegistry.register(
    "activity",
    ERPListWidget
  );

  ERPDashboardWidgetRegistry.register(
    "quickActions",
    ERPQuickActionsWidget
  );

  ERPDashboardWidgetRegistry.register(
    "funnel",
    ERPFunnelWidget
  );
}
