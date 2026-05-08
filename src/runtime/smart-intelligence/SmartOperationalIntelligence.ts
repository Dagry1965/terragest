import type { ERPModule } from "@/runtime/modules";
import { SmartScoringEngine } from "./SmartScoringEngine";
import { SmartAnomalyDetector } from "./SmartAnomalyDetector";
import { SmartRecommendationEngine } from "./SmartRecommendationEngine";
import { SmartPredictionEngine } from "./SmartPredictionEngine";

export class SmartOperationalIntelligence {
  static analyse(module: ERPModule) {
    return {
      score: SmartScoringEngine.score(module),
      anomalies: SmartAnomalyDetector.detect(module),
      recommendations: SmartRecommendationEngine.recommend(module),
      predictions: SmartPredictionEngine.predict(module),
    };
  }
}