import type { ERPModule } from "@/runtime/modules";

export type ERPDashboardWidgetType =
  | "kpi"
  | "timeline"
  | "activity"
  | "status-distribution"
  | string;

export type ERPDashboardRuntimeConfig = {
  moduleKey: string;
  label: string;
  enabled: boolean;
  widgets: ERPDashboardWidgetType[];
  realtime: boolean;
  analytics: boolean;
  layout: "grid" | "timeline" | "cockpit";
};

export function readDashboardConfig(
  module: ERPModule
): ERPDashboardRuntimeConfig {
  return {
    moduleKey: module.metadata.key,
    label: module.metadata.label,
    enabled: module.metadata.dashboard ?? false,
    widgets: module.metadata.dashboardConfig?.widgets ?? ["kpi"],
    realtime: module.metadata.dashboardConfig?.realtime ?? false,
    analytics: module.metadata.dashboardConfig?.analytics ?? false,
    layout: module.metadata.dashboardConfig?.layout ?? "grid",
  };
}

export function readDashboardConfigs(
  modules: ERPModule[]
): ERPDashboardRuntimeConfig[] {
  return modules
    .map(readDashboardConfig)
    .filter((config) => config.enabled);
}