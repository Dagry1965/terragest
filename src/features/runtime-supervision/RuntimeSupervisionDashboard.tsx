"use client";

import {
  ERPNotificationsPanel,
}
from "@/runtime/notifications/ERPNotificationsPanel";

import {
  RuntimeLogsPanel,
}
from "@/runtime/observability/RuntimeLogsPanel";

export function RuntimeSupervisionDashboard() {

  return (

    <div
      className="
        p-10
        space-y-8
      "
    >

      <div>

        <h1
          className="
            text-4xl
            font-bold
          "
        >
          Runtime Supervision
        </h1>

        <p
          className="
            mt-2
            text-gray-500
          "
        >
          Supervision temps réel du runtime ERP
        </p>

      </div>

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-6
        "
      >

        <ERPNotificationsPanel />

        <RuntimeLogsPanel />

      </div>

    </div>
  );
}