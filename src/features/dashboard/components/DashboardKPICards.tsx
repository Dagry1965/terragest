"use client";

interface KPI {

  label: string;

  value: string;

  trend: string;
}

const KPIS: KPI[] = [

  {
    label: "Exploitations",
    value: "24",
    trend: "+12%",
  },

  {
    label: "Superficie",
    value: "3 200 ha",
    trend: "+8%",
  },

  {
    label: "Interventions",
    value: "87",
    trend: "+21%",
  },

  {
    label: "Performance",
    value: "98%",
    trend: "+4%",
  },
];

export const DashboardKPICards =
() => {

  return (

    <div className="
      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-4
      gap-6
    ">

      {KPIS.map(
        (
          kpi
        ) => (

          <div
            key={kpi.label}
            className="
              bg-white
              rounded-3xl
              shadow-md
              p-6
            "
          >

            <div className="
              text-gray-500
            ">

              {kpi.label}

            </div>

            <div className="
              text-4xl
              font-bold
              mt-4
            ">

              {kpi.value}

            </div>

            <div className="
              mt-4
              text-green-600
              font-medium
            ">

              {kpi.trend}

            </div>

          </div>

        )
      )}

    </div>
  );
}
