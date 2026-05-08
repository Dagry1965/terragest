import { ERPPageHeader } from "@/components/erp/ui";
import { seedERPRuntimeResilience } from "@/runtime/resilience";

import { ERPResilienceMetrics } from "./ERPResilienceMetrics";
import { ERPQueuePanel } from "./ERPQueuePanel";
import { ERPDLQPanel } from "./ERPDLQPanel";

seedERPRuntimeResilience();

export function ERPRuntimeResilienceDashboard() {
  return (
    <div className="space-y-8">
      <ERPPageHeader
        eyebrow="ERP Resilience"
        title="Queue, Retry & DLQ Runtime"
        description="Supervision des jobs asynchrones, reprises, echecs isoles et circuit breaker ERP."
      />

      <ERPResilienceMetrics />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ERPQueuePanel />
        <ERPDLQPanel />
      </div>
    </div>
  );
}