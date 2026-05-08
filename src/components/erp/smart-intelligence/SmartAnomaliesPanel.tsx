import type { ERPModule } from "@/runtime/modules";
import { SmartAnomalyDetector } from "@/runtime/smart-intelligence";
import { SmartRiskBadge } from "./SmartRiskBadge";

interface SmartAnomaliesPanelProps {
  module: ERPModule;
}

export function SmartAnomaliesPanel({ module }: SmartAnomaliesPanelProps) {
  const anomalies = SmartAnomalyDetector.detect(module);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-black text-slate-950">
        Anomalies detectees
      </h2>

      <div className="mt-5 space-y-3">
        {anomalies.map((anomaly) => (
          <div
            key={anomaly.id}
            className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black text-slate-900">
                  {anomaly.title}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {anomaly.description}
                </p>
              </div>

              <SmartRiskBadge level={anomaly.level} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}