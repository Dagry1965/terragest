export type SmartRiskLevel =
  | "low"
  | "medium"
  | "high"
  | "critical";

export interface SmartScore {
  moduleKey: string;
  score: number;
  level: SmartRiskLevel;
  label: string;
  description: string;
}

export interface SmartAnomaly {
  id: string;
  moduleKey: string;
  title: string;
  description: string;
  level: SmartRiskLevel;
}

export interface SmartRecommendation {
  id: string;
  moduleKey: string;
  title: string;
  description: string;
  actionLabel: string;
  priority: SmartRiskLevel;
}

export interface SmartPrediction {
  id: string;
  moduleKey: string;
  title: string;
  description: string;
  probability: number;
}