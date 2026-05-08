import { ERPBadge } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPSmartRuntimeEngine } from "@/runtime/smart-runtime";

interface ERPSmartInsightsPanelProps {
  module: ERPModule;
}

export function ERPSmartInsightsPanel({
  module,
}: ERPSmartInsightsPanelProps) {

  const insights =
    ERPSmartRuntimeEngine.analyse(module);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-5">
        <h2 className="text-lg font-black text-slate-950">
          Insights intelligents
        </h2>

        <p className="text-sm text-slate-500">
          Analyse operationnelle du runtime ERP.
        </p>
      </div>

      <div className="space-y-4">

        {insights.map((insight) => (

          <div
            key={insight.id}
            className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
          >

            <div className="flex items-start justify-between gap-3">

              <div>

                <h3 className="text-sm font-black text-slate-900">
                  {insight.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {insight.description}
                </p>

                {insight.recommendation && (
                  <p className="mt-3 text-sm font-medium text-blue-700">
                    {insight.recommendation}
                  </p>
                )}

              </div>

              <ERPBadge tone={insight.level}>
                {insight.level}
              </ERPBadge>

            </div>
          </div>
        ))}

      </div>
    </section>
  );
}