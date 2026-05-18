export type ERPDashboardWidgetType =
  | "kpi"
  | "alert"
  | "timeline"
  | "activity"
  | "quickActions"
  | "funnel";

export type ERPDashboardFilterOperator =
  | "equals"
  | "notEquals"
  | "exists"
  | "notEmpty"
  | "in"
  | "notIn"
  | "today"
  | "notToday"
  | "beforeToday"
  | "afterToday"
  | "lteDaysFromNow"
  | "gteDaysFromNow";

export type ERPDashboardAggregation =
  | "count"
  | "sum";

export interface ERPDashboardFilter {
  field: string;
  operator: ERPDashboardFilterOperator;
  value?: unknown;
}

export interface ERPDashboardQuickAction {
  label: string;
  href: string;
  description?: string;
  tone?: "primary" | "secondary" | "danger";
}

export interface ERPDashboardFunnelStepConfig {
  key: string;
  label: string;
  moduleKey: string;
  href?: string;
  filters?: ERPDashboardFilter[];
}

export interface ERPDashboardFunnelStepResult {
  key: string;
  label: string;
  value: number;
  href?: string;
  conversionRate?: number;
}

export interface ERPDashboardWidgetConfig {
  key: string;
  type: ERPDashboardWidgetType;
  moduleKey?: string;
  title: string;
  description?: string;
  href?: string;
  dateField?: string;
  labelField?: string;
  filters?: ERPDashboardFilter[];
  level?: "info" | "warning" | "critical";
  limit?: number;
  actions?: ERPDashboardQuickAction[];
  aggregation?: ERPDashboardAggregation;
  sumFields?: string[];
  valueSuffix?: string;
  steps?: ERPDashboardFunnelStepConfig[];
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
  valueSuffix?: string;
  actions?: ERPDashboardQuickAction[];
  steps?: ERPDashboardFunnelStepResult[];
  items?: Array<{
    id: string;
    title: string;
    description?: string;
    date?: string;
    level?: "info" | "warning" | "critical";
    href?: string;
  }>;
}
