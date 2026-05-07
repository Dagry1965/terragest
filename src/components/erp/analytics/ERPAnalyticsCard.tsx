"use client";

import { ERPStatusBadge }
from "@/components/erp/page/ERPStatusBadge";

export function ERPAnalyticsCard({
  title,
  value,
  trend,
  status,
}: {
  title: string;
  value: string;
  trend: string;
  status?: "success" | "warning" | "danger";
}) {

  return (

    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >

      <div className="flex items-start justify-between">

        <div>

          <p
            className="
              text-sm
              font-medium
              text-slate-500
            "
          >
            {title}
          </p>

          <p
            className="
              mt-3
              text-4xl
              font-bold
              tracking-tight
              text-slate-950
            "
          >
            {value}
          </p>

          <p
            className="
              mt-2
              text-sm
              text-slate-500
            "
          >
            {trend}
          </p>

        </div>

        {status && (

          <ERPStatusBadge
            label={status.toUpperCase()}
            variant={status}
          />

        )}

      </div>

    </div>
  );
}