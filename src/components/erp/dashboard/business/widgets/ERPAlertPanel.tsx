import type {
  ERPBusinessAlert,
}
from "@/runtime/dashboard/ERPBusinessAlerts";

interface ERPAlertPanelProps {
  alerts: ERPBusinessAlert[];
}

export function ERPAlertPanel({
  alerts,
}: ERPAlertPanelProps) {

  if (
    alerts.length === 0
  ) {

    return (

      <div
        className="
          rounded-2xl
          border
          bg-white
          p-6
          shadow-sm
        "
      >
        <h2
          className="
            text-lg
            font-semibold
            text-slate-950
          "
        >
          Alertes mÃ©tier
        </h2>

        <p
          className="
            mt-4
            text-sm
            text-slate-500
          "
        >
          Aucune alerte dÃ©tectÃ©e.
        </p>
      </div>
    );
  }

  return (

    <div
      className="
        rounded-2xl
        border
        bg-white
        p-6
        shadow-sm
      "
    >

      <h2
        className="
          text-lg
          font-semibold
          text-slate-950
        "
      >
        Alertes mÃ©tier
      </h2>

      <div
        className="
          mt-5
          space-y-3
        "
      >

        {alerts.map(
          (alert) => (

            <div
              key={alert.id}
              className={`
                rounded-xl
                border
                p-4
                text-sm

                ${
                  alert.level ===
                  "critical"

                    ? `
                      border-red-200
                      bg-red-50
                      text-red-900
                    `

                    : `
                      border-amber-200
                      bg-amber-50
                      text-amber-900
                    `
                }
              `}
            >

              <div
                className="
                  font-semibold
                "
              >
                {alert.title}
              </div>

              <div
                className="
                  mt-1
                "
              >
                {alert.message}
              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}