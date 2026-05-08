import { ERPStatCard } from "@/components/erp/ui";
import type { getERPAISnapshot } from "@/runtime/ai";

type Snapshot = ReturnType<typeof getERPAISnapshot>;

type Props = {
  snapshot: Snapshot;
};

export function ERPAIMetricsGrid({
  snapshot,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
      <ERPStatCard label="Insights" value={snapshot.metrics.insights} helper="Runtime intelligence" />
      <ERPStatCard label="Recommendations" value={snapshot.metrics.recommendations} helper="AI guidance" />
      <ERPStatCard label="Anomalies" value={snapshot.metrics.anomalies} helper="Detection" />
      <ERPStatCard label="Search" value={snapshot.metrics.searchResults} helper="Semantic results" />
    </div>
  );
}