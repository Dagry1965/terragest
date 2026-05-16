import { generateERPAIInsights } from "./insights/ERPAIInsightEngine";
import { generateERPAIRecommendations } from "./recommendations/ERPAIRecommendationEngine";
import { detectERPAIAnomalies } from "./anomalies/ERPAIAnomalyDetector";
import { searchERPRuntime } from "./search/ERPSemanticRuntimeSearch";
import { getERPAIAssistantMessages } from "./assistant/ERPAIAssistantEngine";

import {
  ERPAlertStore,
}
from "@/runtime/observability/alerts/ERPAlertStore";

function anomalySeverityToAlertLevel(
  severity: "low" | "medium" | "high"
) {
  if (severity === "high") {
    return "critical";
  }

  if (severity === "medium") {
    return "warning";
  }

  return "info";
}

export function getERPAISnapshot() {
  const insights =
    generateERPAIInsights();

  const recommendations =
    generateERPAIRecommendations();

  const anomalies =
    detectERPAIAnomalies();

  for (const anomaly of anomalies) {
    ERPAlertStore.add({
      id: anomaly.id,
      module: anomaly.module,
      title: anomaly.signal,
      description: anomaly.description,
      level: anomalySeverityToAlertLevel(
        anomaly.severity
      ),
      timestamp: anomaly.detectedAt,
    });
  }

  const searchResults =
    searchERPRuntime("materiels");

  const messages =
    getERPAIAssistantMessages();

  return {
    insights,
    recommendations,
    anomalies,
    searchResults,
    messages,
    metrics: {
      insights: insights.length,
      recommendations: recommendations.length,
      anomalies: anomalies.length,
      searchResults: searchResults.length,
      messages: messages.length,
    },
  };
}