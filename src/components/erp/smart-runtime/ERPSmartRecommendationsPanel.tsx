import type { ERPModule } from "@/runtime/modules";
import { ERPSmartRecommendations } from "@/runtime/smart-runtime";

interface ERPSmartRecommendationsPanelProps {
  module: ERPModule;
}

export function ERPSmartRecommendationsPanel({
  module,
}: ERPSmartRecommendationsPanelProps) {

  const recommendations =
    ERPSmartRecommendations.generate(module);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-5">
        <h2 className="text-lg font-black text-slate-950">
          Recommandations ERP
        </h2>

        <p className="text-sm text-slate-500">
          Suggestions generees par le runtime intelligent.
        </p>
      </div>

      <div className="space-y-3">

        {recommendations.map((recommendation) => (

          <div
            key={recommendation}
            className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-4"
          >
            <p className="text-sm font-medium text-[#0F172A]">
              {recommendation}
            </p>
          </div>

        ))}

      </div>
    </section>
  );
}