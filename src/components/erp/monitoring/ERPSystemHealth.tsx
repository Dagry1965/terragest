"use client";

import { ERPHealthBadge }
from "@/components/erp/badges/ERPHealthBadge";

export function ERPSystemHealth() {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
      {[
        ["Runtime", "healthy"],
        ["Workflows", "healthy"],
        ["Observability", "warning"],
        ["Automation", "healthy"],
      ].map(([label, health]) => (
        <div
          key={label}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">{label}</p>

            <ERPHealthBadge
              health={health as "healthy" | "warning" | "critical"}
            />
          </div>
        </div>
      ))}
    </div>
  );
}