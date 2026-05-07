"use client";

export function ERPKPIGrid() {

  const kpis = [
    {
      label: "Disponibilité ERP",
      value: "99.2%",
    },
    {
      label: "Workflows actifs",
      value: "42",
    },
    {
      label: "Automations",
      value: "18",
    },
    {
      label: "Temps réponse",
      value: "124ms",
    },
  ];

  return (

    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">

      {kpis.map((kpi) => (

        <div
          key={kpi.label}
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
          "
        >

          <p
            className="
              text-xs
              text-slate-500
            "
          >
            {kpi.label}
          </p>

          <p
            className="
              mt-3
              text-3xl
              font-bold
              text-slate-950
            "
          >
            {kpi.value}
          </p>

        </div>

      ))}

    </div>

  );
}