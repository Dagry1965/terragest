Write-Host "=== TERRAGEST_V2 - CONNECT RUNTIME TIMELINE UI ===" -ForegroundColor Cyan

$file = "src/components/erp/generic/GenericDetailPage.tsx"

$content = Get-Content $file -Raw

$content = $content -replace 'import \{ getModuleByKey \} from "@\/core\/modules\/module-registry";',
'import { getModuleByKey } from "@/core/modules/module-registry";
import { getModuleTimeline } from "@/core/runtime/runtime-timeline";'

$content = $content -replace 'const data = mockDetails\[moduleKey\];',
'const data = mockDetails[moduleKey];

  const runtimeTimeline =
    getModuleTimeline(moduleKey);'

$content = $content -replace '<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">\s+<h2 className="text-lg font-semibold text-slate-950">\s+Timeline ERP\s+</h2>\s+<div className="mt-5 space-y-4">\s+<div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">\s+Création de l''entité ERP\s+</div>\s+<div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">\s+Workflow métier déclenché\s+</div>\s+<div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">\s+Audit runtime enregistré\s+</div>\s+</div>\s+</div>',
'<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">
            Runtime Timeline
          </h2>

          <div className="mt-5 space-y-4">
            {runtimeTimeline.length === 0 && (
              <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                Aucune activité runtime ERP.
              </div>
            )}

            {runtimeTimeline.map((entry) => (
              <div
                key={entry.id}
                className="rounded-xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    {entry.type}
                  </div>

                  <div className="text-xs text-slate-400">
                    {entry.timestamp}
                  </div>
                </div>

                <div className="mt-2 text-sm font-medium text-slate-800">
                  {entry.message}
                </div>

                <div className="mt-2 flex gap-2">
                  <span className="rounded-full bg-slate-200 px-2 py-1 text-xs font-medium text-slate-700">
                    {entry.action}
                  </span>

                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                    {entry.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>'

Set-Content $file $content

Write-Host "=== RUNTIME TIMELINE UI connectée ===" -ForegroundColor Green