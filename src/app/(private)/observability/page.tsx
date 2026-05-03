import { AuditTable }
from "@/features/observability/components/AuditTable";

export default function
ObservabilityPage() {

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
          Audit et monitoring
        </p>
      </div>

      <AuditTable />
    </div>
  );
}