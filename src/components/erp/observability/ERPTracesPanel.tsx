import {
  ERPObservabilityTimeline,
} from "@/runtime/observability";

export function ERPTracesPanel() {

  const traces =
    ERPObservabilityTimeline.traces();

  return (
    <div className="space-y-4">

      {traces.map((trace) => (

        <div
          key={trace.traceId}
          className="rounded-2xl border border-slate-200 bg-white p-5"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-semibold text-slate-900">
                {trace.action}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {trace.module}
              </p>

            </div>

            <span
              className={[
                "rounded-full px-3 py-1 text-xs font-medium",

                trace.status === "success"
                  ? "bg-emerald-50 text-emerald-700"
                  : trace.status === "warning"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-red-50 text-red-700",

              ].join(" ")}
            >
              {trace.status}
            </span>

          </div>

        </div>

      ))}

    </div>
  );
}