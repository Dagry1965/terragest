const alerts = [
  "Stock faible sur engrais",
  "Maintenance tracteur requise",
  "Intervention urgente",
];

export const AlertsPanel = () => {

  return (
    <div
      className="
        bg-white
        rounded-2xl
        p-6
        border
        shadow-sm
      "
    >
      <h3
        className="
          text-xl
          font-semibold
          mb-4
        "
      >
        Alertes
      </h3>

      <div className="space-y-3">

        {alerts.map(
          (alert, index) => (

          <div
            key={index}
            className="
              p-3
              rounded-xl
              bg-red-50
              text-red-700
            "
          >
            {alert}
          </div>
        ))}
      </div>
    </div>
  );
};