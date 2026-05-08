import { ERPButton } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { SmartRecommendationEngine } from "@/runtime/smart-intelligence";
import { SmartRiskBadge } from "./SmartRiskBadge";

interface SmartRecommendationsPanelProps {
  module: ERPModule;
}

export function SmartRecommendationsPanel({
  module,
}: SmartRecommendationsPanelProps) {
  const recommendations = SmartRecommendationEngine.recommend(module);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-black text-slate-950">
        Recommandations
      </h2>

      <div className="mt-5 space-y-3">
        {recommendations.map((recommendation) => (
          <div
            key={recommendation.id}
            className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black text-slate-900">
                  {recommendation.title}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {recommendation.description}
                </p>
              </div>

              <SmartRiskBadge level={recommendation.priority} />
            </div>

            <ERPButton variant="ghost" type="button">
              {recommendation.actionLabel}
            </ERPButton>
          </div>
        ))}
      </div>
    </section>
  );
}