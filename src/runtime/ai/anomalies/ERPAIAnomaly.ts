export type ERPAIAnomaly = {
  id: string;
  module: string;
  signal: string;
  severity: "low" | "medium" | "high";
  description: string;
  detectedAt: string;
};