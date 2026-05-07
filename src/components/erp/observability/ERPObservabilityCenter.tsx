"use client";

import { ERPHealthBadge }
from "@/components/erp/badges/ERPHealthBadge";

export function ERPObservabilityCenter() {

  const metrics = [
    {
      label: "Logs runtime",
      value: "12 842",
      health: "healthy",
    },
    {
      label: "Erreurs critiques",
      value: "2",
      health: "warning",
    },
    {
      label: "Retries",
      value: "18",
      health: "healthy",
    },
    {
      label: "Dead Letter Queue",
      value: "1",
      health: "warning",
    },
  ];

  return (

    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

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

          <div className="flex items-center justify-between">

            <p
              className="
                text-sm
                text-slate-500
              "
            >
              {metric.label}
            </p>

            <ERPHealthBadge
              health={
                metric.health as
                | "healthy"
                | "warning"
                | "critical"
              }
            />

          </div>

          <p
            className="
              mt-4
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