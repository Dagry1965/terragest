import { ERPSection } from "@/components/erp/ui";
import type { getERPAISnapshot } from "@/runtime/ai";

type Snapshot = ReturnType<typeof getERPAISnapshot>;

type Props = {
  snapshot: Snapshot;
};

export function ERPAIRecommendationsPanel({
  snapshot,
}: Props) {
  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Recommendations
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Suggestions operationnelles pour renforcer la plateforme.
        </p>
      </div>

      <div className="space-y-4">
        {snapshot.recommendations.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {item.description}
                </p>
              </div>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {item.impact}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ERPSection>
  );
}