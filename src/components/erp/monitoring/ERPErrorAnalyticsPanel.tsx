type ERPErrorAlert = {
  id: string;
  title?: string;
  message?: string;
  level?: string;
};

type ERPErrorAnalyticsPanelProps = {
  errors?: {
    alerts?: ERPErrorAlert[];
  };

  snapshot?: {
    errors?: {
      alerts?: ERPErrorAlert[];
    };
  };
};

export function ERPErrorAnalyticsPanel({
  errors,
  snapshot,
}: ERPErrorAnalyticsPanelProps) {
  const alerts =
    errors?.alerts ??
    snapshot?.errors?.alerts ??
    [];

  return (
    <div className="space-y-4">
      {alerts.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          Aucune alerte runtime.
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert: ERPErrorAlert) => (
            <div
              key={alert.id}
              className="rounded-2xl border border-amber-200 bg-amber-50 p-5"
            >
              <p className="font-semibold text-slate-900">
                {alert.title ?? "Alerte runtime"}
              </p>

              <p className="mt-1 text-sm text-slate-600">
                {alert.message ?? alert.level ?? "Aucun détail disponible."}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}