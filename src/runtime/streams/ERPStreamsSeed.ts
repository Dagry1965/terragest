import {
  ERPRealtimeGateway,
} from "./gateway/ERPRealtimeGateway";

let seeded = false;

export function seedERPStreamsRuntime() {

  if (seeded) {
    return;
  }

  seeded = true;

  ERPRealtimeGateway.publish({
    module: "runtime",
    type: "BOOT",
    message: "Runtime ERP initialise",
    level: "info",
  });

  ERPRealtimeGateway.publish({
    module: "workers",
    type: "JOB_COMPLETED",
    message: "Worker execution terminee",
    level: "info",
  });

  ERPRealtimeGateway.publish({
    module: "security",
    type: "ACCESS_DENIED",
    message: "Tentative d'acces refusee",
    level: "warning",
  });

  ERPRealtimeGateway.publish({
    module: "monitoring",
    type: "HEALTH_CRITICAL",
    message: "Health check critique",
    level: "critical",
  });

  ERPRealtimeGateway.refreshMetrics();
}