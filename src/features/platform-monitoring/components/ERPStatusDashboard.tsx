// src/features/platform-monitoring/components/ERPStatusDashboard.tsx

"use client";

import { useEffect, useState }
from "react";

interface ERPStatus {

  modules: unknown[];

  metrics: Record<string, number>;

  events: unknown[];
}

export function ERPStatusDashboard() {

  const [status, setStatus] =
    useState<ERPStatus | null>(null);

  useEffect(() => {

    async function loadStatus() {

      const response =
        await fetch(
          "/api/platform/status"
        );

      const data =
        await response.json();

      setStatus(data);
    }

    loadStatus();
  }, []);

  if (!status) {

    return (
      <div>
        Loading ERP status...
      </div>
    );
  }

  return (

    <div className="space-y-6">

      <div>

        <h2 className="text-2xl font-bold">
          ERP Monitoring
        </h2>

        <p>
          Modules:
          {" "}
          {status.modules.length}
        </p>

        <p>
          Events:
          {" "}
          {status.events.length}
        </p>
      </div>

      <div>

        <h3 className="font-semibold">
          Metrics
        </h3>

        <pre>
          {JSON.stringify(
            status.metrics,
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
}