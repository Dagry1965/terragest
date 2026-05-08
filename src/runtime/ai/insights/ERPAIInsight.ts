export type ERPAIInsightLevel =
  | "info"
  | "warning"
  | "critical";

export type ERPAIInsight = {
  id: string;
  title: string;
  description: string;
  module: string;
  level: ERPAIInsightLevel;
  confidence: number;
  createdAt: string;
};