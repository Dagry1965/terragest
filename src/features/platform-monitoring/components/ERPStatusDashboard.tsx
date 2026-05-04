// src/features/platform-monitoring/components/ERPStatusDashboard.tsx

"use client";

import { useEffect, useState }
from "react";

import { EventTimeline }
from "./graphs/EventTimeline";

import { MetricsPanel }
from "./graphs/MetricsPanel";

interface ERPEvent {

  event: string;

  timestamp?: string;
}

interface ERPStatus {

  modules: unknown[];

  metrics: Record<string, number>;

  events: ERPEvent[];
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

      <MetricsPanel
        metrics={status.metrics}
      />

      <EventTimeline
        events={status.events}
      />
    </div>
  );
}