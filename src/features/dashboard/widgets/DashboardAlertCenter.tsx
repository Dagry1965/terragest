"use client";

const ALERTS = [

  {
    level: "critical",
    message:
      "Stock critique dÃ©tectÃ©",
  },

  {
    level: "warning",
    message:
      "MÃ©tÃ©o dÃ©favorable",
  },

  {
    level: "info",
    message:
      "Nouvelle analyse IA disponible",
  },
];

export const DashboardAlertCenter =
() => {

  return (

    <div className="
      bg-white
      rounded-3xl
      shadow-md
      p-6
      space-y-4
    ">

      <div>

        <h2 className="
          text-2xl
          font-bold
        ">

          Alertes

        </h2>

      </div>

      {ALERTS.map(
        (
          alert,
          index
        ) => (

          <div
            key={index}
            className="
              rounded-2xl
              border
              p-4
            "
          >

            <div className="
              font-semibold
            ">

              {alert.level}

            </div>

            <div className="
              text-gray-600
              mt-2
            ">

              {alert.message}

            </div>

          </div>

        )
      )}

    </div>
  );
}
