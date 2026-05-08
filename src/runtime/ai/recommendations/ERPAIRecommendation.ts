export type ERPAIRecommendation = {
  id: string;
  title: string;
  description: string;
  module: string;
  impact: "low" | "medium" | "high";
  actionLabel?: string;
  createdAt: string;
};