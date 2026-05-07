"use client";

import { ERPHealthBadge }
from "@/components/erp/badges/ERPHealthBadge";

export function ERPRuntimeStatus() {

  const services = [
    {
      name: "Workflow Engine",
      health: "healthy",
    },
    {
      name: "Automation Runner",
      health: "healthy",
    },
    {
      name: "Observability",
      health: "warning",
    },
    {
      name: "Rules Engine",
      health: "healthy",
    },
    {
      name: "Event Bus",
      health: "healthy",
    },
    {
      name: "Notifications",
      health: "healthy",
    },
  ];

  return (

    <div className="space-y-4">

      {services.map((service) => (

        <div
          key={service.name}
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

          <p
            className="
              text-sm
              font-medium
              text-slate-900
            "
          >
            {service.name}
          </p>

          <ERPHealthBadge
            health={
              service.health as
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