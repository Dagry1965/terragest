import { ERPSection } from "@/components/erp/ui";
import { ERPWorkflowTimelineStore } from "@/runtime/workflows/enterprise";

export function ERPWorkflowTimelinePanel() {
  const items =
    ERPWorkflowTimelineStore.all();

  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Timeline workflow
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Evenements produits par le workflow engine.
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <p className="font-semibold text-slate-900">
              {item.label}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {item.module} - {item.state}
            </p>
          </div>
        ))}
      </div>
    </ERPSection>
  );
}