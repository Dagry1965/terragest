import { generateERPAIInsights } from "./insights/ERPAIInsightEngine";
import { generateERPAIRecommendations } from "./recommendations/ERPAIRecommendationEngine";
import { detectERPAIAnomalies } from "./anomalies/ERPAIAnomalyDetector";
import { searchERPRuntime } from "./search/ERPSemanticRuntimeSearch";
import { getERPAIAssistantMessages } from "./assistant/ERPAIAssistantEngine";

export function getERPAISnapshot() {
  const insights =
    generateERPAIInsights();

  const recommendations =
    generateERPAIRecommendations();

  const anomalies =
    detectERPAIAnomalies();

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