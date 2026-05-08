import {
  ERPObservabilityTimeline,
} from "@/runtime/observability";

export function ERPAlertsPanel() {

  const alerts =
    ERPObservabilityTimeline.alerts();

  return (
    <div className="space-y-4">

      {alerts.map((alert) => (

        <div
          key={alert.id}
          className="rounded-2xl border border-slate-200 bg-white p-5"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-semibold text-slate-900">
                {alert.title}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {alert.description}
              </p>

            </div>

            <span
              className={[
                "rounded-full px-3 py-1 text-xs font-medium",

                alert.level === "critical"
                  ? "bg-red-50 text-red-700"
                  : alert.level === "warning"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-slate-100 text-slate-700",

              ].join(" ")}
            >
              {alert.level}
            </span>

          </div>

        </div>

      ))}

    </div>
  );
}