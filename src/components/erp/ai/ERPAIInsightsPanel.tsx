import { ERPSection } from "@/components/erp/ui";
import type { getERPAISnapshot } from "@/runtime/ai";

type Snapshot = ReturnType<typeof getERPAISnapshot>;

type Props = {
  snapshot: Snapshot;
};

export function ERPAIInsightsPanel({
  snapshot,
}: Props) {
  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          AI Insights
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Analyse intelligente du runtime ERP.
        </p>
      </div>

      <div className="space-y-4">
        {snapshot.insights.map((insight) => (
          <div
            key={insight.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">
                  {insight.title}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {insight.description}
                </p>
              </div>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                {insight.confidence}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </ERPSection>
  );
}