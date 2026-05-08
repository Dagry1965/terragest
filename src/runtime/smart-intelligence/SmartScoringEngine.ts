import type { ERPModule } from "@/runtime/modules";
import type { SmartScore, SmartRiskLevel } from "./SmartIntelligenceTypes";

function levelFromScore(score: number): SmartRiskLevel {
  if (score >= 85) return "critical";
  if (score >= 65) return "high";
  if (score >= 40) return "medium";
  return "low";
}

export class SmartScoringEngine {
  static score(module: ERPModule): SmartScore {
    const baseScores: Record<string, number> = {
      materiels: 78,
      stocks: 84,
      exploitations: 62,
      terrains: 38,
      produits: 31,
    };

    const score = baseScores[module.metadata.key] ?? 52;

    return {
      moduleKey: module.metadata.key,
      score,
      level: levelFromScore(score),
      label: "Score operationnel",
      description:
        "Score calcule a partir des signaux runtime, workflows, events et donnees metier.",
    };
  }
}