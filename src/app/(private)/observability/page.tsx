import { formatDisplayValue } from "@/core/utils/formatFirestoreDate";
import { AuditTable }
from "@/features/observability/components/AuditTable";

import LiveRuntimeDashboard
from "@/features/observability/dashboards/LiveRuntimeDashboard";

import WorkflowExecutionMonitor
from "@/features/observability/widgets/workflows/WorkflowExecutionMonitor";

export default function ObservabilityPage() {

  return (

    <div
      className="
        p-6
        space-y-6
      "
    >

      <div>

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Observability
        </h1>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          Audit, monitoring et Ã©vÃ©nements runtime
        </p>

      </div>

      <LiveRuntimeDashboard />

<WorkflowExecutionMonitor />
      <AuditTable />

    </div>
  );
}

