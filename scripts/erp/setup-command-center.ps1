Write-Host "=== TERRAGEST_V2 - SETUP ERP COMMAND CENTER ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/components/erp/command-center" | Out-Null
New-Item -ItemType Directory -Force "src/app/(private)/supervision" | Out-Null

@'
import {
  getRuntimeTimeline,
} from "@/core/runtime/runtime-timeline";

export function ERPCommandCenter() {
  const runtime =
    getRuntimeTimeline();

  const workflowCount =
    runtime.filter(
      (entry) =>
        entry.type === "workflow"
    ).length;

  const warningCount =
    runtime.filter(
      (entry) =>
        entry.status === "warning"
    ).length;

  const failedCount =
    runtime.filter(
      (entry) =>
        entry.status === "failed"
    ).length;

  const eventCount =
    runtime.filter(
      (entry) =>
        entry.type === "event"
    ).length;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-slate-950 p-8 text-white shadow-sm">
        <div className="text-sm font-medium uppercase tracking-wide text-slate-400">
          ERP COMMAND CENTER
        </div>

        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Supervision Runtime ERP
        </h1>

        <p className="mt-4 max-w-3xl text-slate-300">
          Observabilité, supervision, runtime timeline,
          workflows, événements, règles métier et monitoring ERP.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Runtime Events
          </div>

          <div className="mt-3 text-3xl font-bold text-slate-950">
            {eventCount}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Workflows
          </div>

          <div className="mt-3 text-3xl font-bold text-slate-950">
            {workflowCount}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Warnings
          </div>

          <div className="mt-3 text-3xl font-bold text-amber-600">
            {warningCount}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Runtime Failures
          </div>

          <div className="mt-3 text-3xl font-bold text-red-600">
            {failedCount}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-950">
            Runtime Timeline
          </h2>
        </div>

        <div className="divide-y divide-slate-100">
          {runtime.length === 0 && (
            <div className="p-6 text-sm text-slate-500">
              Aucun événement runtime ERP.
            </div>
          )}

          {runtime.map((entry) => (
            <div
              key={entry.id}
              className="p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-slate-200 px-2 py-1 text-xs font-medium text-slate-700">
                      {entry.module}
                    </span>

                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                      {entry.type}
                    </span>

                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                      {entry.status}
                    </span>
                  </div>

                  <div className="mt-3 text-sm font-medium text-slate-900">
                    {entry.message}
                  </div>

                  <div className="mt-2 text-xs text-slate-400">
                    Action : {entry.action}
                  </div>
                </div>

                <div className="text-xs text-slate-400">
                  {entry.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
'@ | Set-Content "src/components/erp/command-center/ERPCommandCenter.tsx"

@'
import { ERPCommandCenter } from "@/components/erp/command-center/ERPCommandCenter";

export default function SupervisionPage() {
  return <ERPCommandCenter />;
}
'@ | Set-Content "src/app/(private)/supervision/page.tsx"

Write-Host "=== ERP COMMAND CENTER créé avec succès ===" -ForegroundColor Green