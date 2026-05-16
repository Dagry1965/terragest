import { ERPSection } from "@/components/erp/ui";
import type { getERPMonitoringSnapshot } from "@/runtime/monitoring";

type Snapshot = ReturnType<typeof getERPMonitoringSnapshot>;

type Props = {
  snapshot: Snapshot;
};

export function ERPTopologyPanel({
  snapshot,
}: Props) {
  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Runtime Topology
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Graphe logique des dependances ERP.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {snapshot.graph.nodes.map((node) => (
          <div
            key={node.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <p className="font-semibold text-slate-900">
              {node.label}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {node.group}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-2">
        {snapshot.graph.edges.map((edge) => (
          <div
            key={`${edge.from}-${edge.to}`}
            className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600"
          >
            {edge.from} → {edge.to}
            {edge.label ? ` / ${edge.label}` : ""}
          </div>
        ))}
      </div>
    </ERPSection>
  );
}