import type {
  ERPWorkspace,
  ERPWorkspaceKpi,
  ERPWorkspaceModule,
  ERPWorkspaceQuickAction,
} from "../ERPWorkspaceTypes";

import type {
  ERPDashboardWidgetConfig,
} from "@/runtime/dashboard/generic/ERPDashboardTypes";

export interface ERPWorkspacePluginContext {
  workspace: ERPWorkspace;
}

export interface ERPWorkspacePlugin {

  key: string;

  enabled?: boolean;

  resolveModules?: (
    context: ERPWorkspacePluginContext
  ) => ERPWorkspaceModule[];

  resolveWidgets?: (
    context: ERPWorkspacePluginContext
  ) => ERPDashboardWidgetConfig[];

  resolveKpis?: (
    context: ERPWorkspacePluginContext
  ) => ERPWorkspaceKpi[];

  resolveQuickActions?: (
    context: ERPWorkspacePluginContext
  ) => ERPWorkspaceQuickAction[];
}