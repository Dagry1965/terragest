Write-Host "=== TERRAGEST_V2 - CONNECT AUTOMATION DASHBOARD ===" -ForegroundColor Cyan

$file =
  "src/components/erp/command-center/ERPCommandCenter.tsx"

$content =
  Get-Content $file -Raw

# =====================================================
# IMPORTS
# =====================================================

$content =
  $content -replace 'import \{
\s+getCircuits,
\s+\} from "@\/core\/circuit-breaker\/circuit-breaker-engine";',
'import {
  getCircuits,
} from "@/core/circuit-breaker/circuit-breaker-engine";

import {
  getAutomationsRegistry,
} from "@/core/automation/registry/automation-registry";'

# =====================================================
# DATA
# =====================================================

$content =
  $content -replace 'const circuits =
\s+getCircuits\(\);',
'const circuits =
    getCircuits();

  const automations =
    getAutomationsRegistry();'

# =====================================================
# AUTOMATION DASHBOARD
# =====================================================

$content =
  $content -replace '</section>\s+<section className="rounded-2xl border border-slate-200 bg-white shadow-sm">',
'</section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-950">
            ERP Automations
          </h2>
        </div>

        <div className="divide-y divide-slate-100">
          {automations.length === 0 && (
            <div className="p-6 text-sm text-slate-500">
              Aucune automatisation ERP.
            </div>
          )}

          {automations.map(
            (automation) => (
              <div
                key={
                  automation.rule.id
                }
                className="p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-slate-200 px-2 py-1 text-xs font-medium text-slate-700">
                        {
                          automation.rule
                            .module
                        }
                      </span>

                      <span
                        className={
                          automation
                            .metadata
                            .enabled
                            ? "rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700"
                            : "rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700"
                        }
                      >
                        {automation
                          .metadata
                          .enabled
                          ? "enabled"
                          : "disabled"}
                      </span>
                    </div>

                    <div className="mt-3 text-sm font-semibold text-slate-900">
                      {
                        automation.rule
                          .name
                      }
                    </div>

                    <div className="mt-2 text-xs text-slate-500">
                      Executions :
                      {" "}
                      {
                        automation
                          .metadata
                          .executions
                      }
                    </div>
                  </div>

                  <div className="text-xs text-slate-400">
                    {
                      automation
                        .metadata
                        .createdAt
                    }
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">'

Set-Content `
  $file `
  $content

Write-Host "=== AUTOMATION DASHBOARD connecté ===" -ForegroundColor Green