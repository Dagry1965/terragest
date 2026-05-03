"use client";

import { useAlerts }
from "@/features/alerts/hooks/useAlerts";

export const AlertsPanel = () => {

  const {
    alerts,
    loading,
  } = useAlerts();

  if (loading) {

    return (
      <p>
        Chargement alertes...
      </p>
    );
  }

  if (alerts.length === 0) {

    return (
      <div
        className="
          bg-white
          rounded-2xl
          border
          p-6
        "
      >
        <h3
          className="
            text-xl
            font-semibold
          "
        >
          Alertes
        </h3>

        <p
          className="
            text-gray-500
            mt-4
          "
        >
          Aucune alerte active
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        p-6
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          mb-6
        "
      >
        <h3
          className="
            text-xl
            font-semibold
          "
        >
          Alertes
        </h3>

        <span
          className="
            bg-red-600
            text-white
            text-xs
            px-3
            py-1
            rounded-full
          "
        >
          {alerts.length}
        </span>
      </div>

      <div className="space-y-3">

        {alerts.map((alert) => (

          <div
            key={alert.id}
            className={`
              p-4
              rounded-xl
              border

              ${
                alert.level ===
                "critical"
                  ? "bg-red-50 border-red-200"
                  : ""
              }

              ${
                alert.level ===
                "warning"
                  ? "bg-yellow-50 border-yellow-200"
                  : ""
              }

              ${
                alert.level ===
                "info"
                  ? "bg-blue-50 border-blue-200"
                  : ""
              }
            `}
          >
            <p
              className="
                font-semibold
              "
            >
              {alert.title}
            </p>

            <p
              className="
                text-sm
                mt-1
              "
            >
              {alert.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};