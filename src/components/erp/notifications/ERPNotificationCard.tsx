"use client";

import { ERPStatusBadge }
from "@/components/erp/ui/ERPStatusBadge";

export function ERPNotificationCard({
  title,
  message,
  status,
}: {
  title: string;
  message: string;
  status: "success" | "warning" | "danger";
}) {

  return (

    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
      "
    >

      <div className="flex items-start justify-between gap-4">

        <div>

          <p
            className="
              text-sm
              font-semibold
              text-slate-900
            "
          >
            {title}
          </p>

          <p
            className="
              mt-2
              text-sm
              text-slate-500
            "
          >
            {message}
          </p>

        </div>

        <ERPStatusBadge
          label={status.toUpperCase()}
          variant={status}
        />

      </div>

    </div>
  );
}