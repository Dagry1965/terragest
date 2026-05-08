export type ERPSmartInsightLevel =
  | "info"
  | "success"
  | "warning"
  | "danger";

export interface ERPSmartInsight {
  id: string;
  title: string;
  description: string;
  level: ERPSmartInsightLevel;
  recommendation?: string;
}