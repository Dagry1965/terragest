import { ERPBadge } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPSmartPriorityEngine } from "@/runtime/smart-runtime";

interface ERPSmartPriorityPanelProps {
  module: ERPModule;
}

export function ERPSmartPriorityPanel({
  module,
}: ERPSmartPriorityPanelProps) {

  const priorities =
    ERPSmartPriorityEngine.priorities(module);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-5">
        <h2 className="text-lg font-black text-slate-950">
          Priorites intelligentes
        </h2>

        <p className="text-sm text-slate-500">
          Actions prioritaires detectees.
        </p>
      </div>

      <div className="space-y-3">

        {priorities.map((priority) => (

          <div
            key={priority.label}
            className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
          >

            <div>
              <p className="text-sm font-black text-slate-900">
                {priority.label}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {priority.value}
              </p>
            </div>

            <ERPBadge tone="warning">
              Action
            </ERPBadge>

          </div>
        ))}

      </div>
    </section>
  );
}