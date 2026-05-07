"use client";

import { ERPHealthBadge }
from "@/components/erp/badges/ERPHealthBadge";

export function ERPSecurityPanel() {

  const checks = [
    {
      label: "Authentication",
      health: "healthy",
    },
    {
      label: "Permissions",
      health: "healthy",
    },
    {
      label: "Audit logs",
      health: "healthy",
    },
    {
      label: "Sensitive actions",
      health: "warning",
    },
  ];

  return (

    <div className="space-y-4">

      {checks.map((check) => (

        <div
          key={check.label}
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
            {check.label}
          </p>

          <ERPHealthBadge
            health={
              check.health as
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