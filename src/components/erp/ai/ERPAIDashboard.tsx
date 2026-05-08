import { ERPPageHeader } from "@/components/erp/ui";
import { getERPAISnapshot } from "@/runtime/ai";

import { ERPAIMetricsGrid } from "./ERPAIMetricsGrid";
import { ERPAIInsightsPanel } from "./ERPAIInsightsPanel";
import { ERPAIRecommendationsPanel } from "./ERPAIRecommendationsPanel";
import { ERPAIAnomaliesPanel } from "./ERPAIAnomaliesPanel";
import { ERPAISearchPanel } from "./ERPAISearchPanel";

export function ERPAIDashboard() {
  const snapshot = getERPAISnapshot();

  return (
    <div className="space-y-8">
      <ERPPageHeader
        eyebrow="ERP Intelligence"
        title="Enterprise AI Runtime Layer"
        description="Insights, recommandations, detection d'anomalies et recherche semantique runtime."
      />

      <ERPAIMetricsGrid snapshot={snapshot} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ERPAIInsightsPanel snapshot={snapshot} />
        <ERPAIRecommendationsPanel snapshot={snapshot} />
        <ERPAIAnomaliesPanel snapshot={snapshot} />
        <ERPAISearchPanel snapshot={snapshot} />
      </div>
    </div>
  );
}