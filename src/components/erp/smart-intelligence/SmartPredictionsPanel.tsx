import type { ERPModule } from "@/runtime/modules";
import { SmartPredictionEngine } from "@/runtime/smart-intelligence";

interface SmartPredictionsPanelProps {
  module: ERPModule;
}

export function SmartPredictionsPanel({ module }: SmartPredictionsPanelProps) {
  const predictions = SmartPredictionEngine.predict(module);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-black text-slate-950">
        Predictions
      </h2>

      <div className="mt-5 space-y-3">
        {predictions.map((prediction) => (
          <div
            key={prediction.id}
            className="rounded-2xl border border-slate-100 bg-blue-50 p-4"
          >
            <p className="text-sm font-black text-blue-950">
              {prediction.title}
            </p>
            <p className="mt-1 text-sm text-blue-800">
              {prediction.description}
            </p>

            <div className="mt-4 flex items-center gap-3">
              <div className="h-2 flex-1 rounded-full bg-white">
                <div
                  className="h-2 rounded-full bg-blue-600"
                  style={{ width: `${prediction.probability}%` }}
                />
              </div>

              <span className="text-sm font-black text-blue-950">
                {prediction.probability}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}