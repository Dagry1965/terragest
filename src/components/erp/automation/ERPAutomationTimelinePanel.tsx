import {
  ERPAutomationTimelineStore,
} from "@/runtime/automation";

export function ERPAutomationTimelinePanel() {

  const executions =
    ERPAutomationTimelineStore.all();

  return (
    <div className="space-y-4">

      {executions.map((execution) => (

        <div
          key={execution.id}
          className="rounded-2xl border border-slate-200 bg-white p-5"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-semibold text-slate-900">
                {execution.action}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {execution.module}
              </p>

            </div>

            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              {execution.status}
            </span>

          </div>

        </div>

      ))}

    </div>
  );
}