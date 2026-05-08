import type { ERPModule } from "@/runtime/modules";
import { SmartScorePanel } from "./SmartScorePanel";
import { SmartAnomaliesPanel } from "./SmartAnomaliesPanel";
import { SmartRecommendationsPanel } from "./SmartRecommendationsPanel";
import { SmartPredictionsPanel } from "./SmartPredictionsPanel";

interface SmartOperationalIntelligencePanelProps {
  module: ERPModule;
}

export function SmartOperationalIntelligencePanel({
  module,
}: SmartOperationalIntelligencePanelProps) {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-950">
          Intelligence operationnelle
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Analyse intelligente du module {module.metadata.label}.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <SmartScorePanel module={module} />

        <div className="grid gap-6 xl:grid-cols-2">
          <SmartAnomaliesPanel module={module} />
          <SmartPredictionsPanel module={module} />
        </div>
      </div>

      <SmartRecommendationsPanel module={module} />
    </section>
  );
}