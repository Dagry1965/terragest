import type {
  ERPWorkspace,
  ERPWorkspaceKpi,
  ERPWorkspaceModule,
  ERPWorkspaceQuickAction,
} from "./ERPWorkspaceTypes";

import type {
  ERPDashboardWidgetConfig,
} from "@/runtime/dashboard/generic/ERPDashboardTypes";

export interface ERPWorkspaceContext {
  workspace: ERPWorkspace;

  modules: ERPWorkspaceModule[];

  widgets: ERPDashboardWidgetConfig[];

  kpis: ERPWorkspaceKpi[];

  quickActions: ERPWorkspaceQuickAction[];
}