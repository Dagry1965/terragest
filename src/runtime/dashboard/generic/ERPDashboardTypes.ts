export type ERPDashboardWidgetType =
  | "kpi"
  | "alert"
  | "timeline";

export type ERPDashboardFilterOperator =
  | "equals"
  | "notEquals"
  | "exists"
  | "lteDaysFromNow"
  | "gteDaysFromNow";

export interface ERPDashboardFilter {
  field: string;
  operator: ERPDashboardFilterOperator;
  value?: unknown;
}

export interface ERPDashboardWidgetConfig {
  key: string;
  type: ERPDashboardWidgetType;
  moduleKey: string;
  title: string;
  description?: string;
  href?: string;
  dateField?: string;
  labelField?: string;
  filters?: ERPDashboardFilter[];
  level?: "info" | "warning" | "critical";
}

export interface ERPDashboardConfig {
  key: string;
  title: string;
  subtitle?: string;
  widgets: ERPDashboardWidgetConfig[];
}

export interface ERPDashboardWidgetResult {
  key: string;
  type: ERPDashboardWidgetType;
  title: string;
  description?: string;
  href?: string;
  value?: number;
  items?: Array<{
    id: string;
    title: string;
    description?: string;
    date?: string;
    level?: "info" | "warning" | "critical";
  }>;
}