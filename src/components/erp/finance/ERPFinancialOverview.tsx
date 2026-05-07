"use client";

export function ERPFinancialOverview() {

  const metrics = [
    {
      label: "Revenus mensuels",
      value: "€ 128K",
    },
    {
      label: "Coûts opérationnels",
      value: "€ 74K",
    },
    {
      label: "Maintenance",
      value: "€ 18K",
    },
    {
      label: "Marge",
      value: "+22%",
    },
  ];

  return (

    <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">

      {metrics.map((metric) => (

        <div
          key={metric.label}
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
            {metric.label}
          </p>

          <p
            className="
              mt-3
              text-3xl
              font-bold
              text-slate-950
            "
          >
            {metric.value}
          </p>

        </div>

      ))}

    </div>

  );
}