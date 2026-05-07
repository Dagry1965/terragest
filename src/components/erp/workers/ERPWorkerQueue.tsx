"use client";

import { ERPHealthBadge }
from "@/components/erp/badges/ERPHealthBadge";

export function ERPWorkerQueue() {

  const workers = [
    {
      name: "maintenance-worker",
      jobs: 12,
      health: "healthy",
    },
    {
      name: "notifications-worker",
      jobs: 4,
      health: "healthy",
    },
    {
      name: "observability-worker",
      jobs: 2,
      health: "warning",
    },
    {
      name: "automation-worker",
      jobs: 9,
      health: "healthy",
    },
  ];

  return (

    <div className="space-y-4">

      {workers.map((worker) => (

        <div
          key={worker.name}
          className="
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-5
            py-4
            shadow-sm
          "
        >

          <div>

            <p
              className="
                text-sm
                font-semibold
                text-slate-900
              "
            >
              {worker.name}
            </p>

            <p
              className="
                mt-1
                text-xs
                text-slate-500
              "
            >
              {worker.jobs} jobs actifs
            </p>

          </div>

          <ERPHealthBadge
            health={
              worker.health as
              | "healthy"
              | "warning"
              | "critical"
            }
          />

        </div>

      ))}

    </div>

  );
}