// src/platform/monitoring/ERPMonitoringService.ts

import { ModuleRegistry }
from "@/platform/registry/ModuleRegistry";

import { MetricsRegistry }
from "@/platform/observability/MetricsRegistry";

import { EventStore }
from "@/platform/observability/EventStore";

export class ERPMonitoringService {

  static getStatus() {

    return {

      modules:
        ModuleRegistry
          .getEnabledModules(),

      metrics:
        MetricsRegistry
          .getMetrics(),

      events:
        EventStore
          .getEvents()
    };
  }

  static printStatus() {

    const status =
      this.getStatus();

    console.log(
      "[ERP STATUS]",
      status
    );
  }
}