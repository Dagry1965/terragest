import type { ERPModule } from "@/runtime/modules";
import { SmartScoringEngine } from "@/runtime/smart-intelligence";
import { SmartRiskBadge } from "./SmartRiskBadge";

interface SmartScorePanelProps {
  module: ERPModule;
}

export function SmartScorePanel({ module }: SmartScorePanelProps) {
  const score = SmartScoringEngine.score(module);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-950">
            Score intelligent
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {score.description}
          </p>
        </div>

        <SmartRiskBadge level={score.level} />
      </div>

      <p className="mt-6 text-5xl font-black text-slate-950">
        {score.score}
      </p>

      <div className="mt-4 h-3 rounded-full bg-slate-100">
        <div
          className="h-3 rounded-full bg-blue-600"
          style={{ width: `${score.score}%` }}
        />
      </div>
    </section>
  );
}