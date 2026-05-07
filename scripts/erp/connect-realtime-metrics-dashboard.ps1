Write-Host "=== TERRAGEST_V2 - SETUP REALTIME METRICS DASHBOARD ===" -ForegroundColor Cyan

$file =
  "src/components/erp/command-center/ERPCommandCenter.tsx"

$content =
  Get-Content $file -Raw

# =====================================================
# IMPORTS
# =====================================================

$content =
  $content -replace 'import \{
\s+getJobQueue,
\s+\} from "@\/core\/jobs\/job-queue";',
'import {
  getJobQueue,
} from "@/core/jobs/job-queue";

import {
  getMetrics,
} from "@/core/metrics/metrics-engine";

import {
  getDeadJobs,
} from "@/core/dead-letter/dead-letter-queue";

import {
  getCircuits,
} from "@/core/circuit-breaker/circuit-breaker-engine";'

# =====================================================
# DATA
# =====================================================

$content =
  $content -replace 'const jobs =
\s+getJobQueue\(\);',
'const jobs =
    getJobQueue();

  const metrics =
    getMetrics();

  const deadJobs =
    getDeadJobs();

  const circuits =
    getCircuits();'

# =====================================================
# METRICS SECTION
# =====================================================

$content =
  $content -replace '</section>\s+<section className="rounded-2xl border border-slate-200 bg-white shadow-sm">',
'</section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Processed Jobs
          </div>

          <div className="mt-3 text-3xl font-bold text-slate-950">
            {metrics.processedJobs}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Failed Jobs
          </div>

          <div className="mt-3 text-3xl font-bold text-red-600">
            {metrics.failedJobs}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Retries
          </div>

          <div className="mt-3 text-3xl font-bold text-amber-600">
            {metrics.retriedJobs}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Dead Jobs
          </div>

          <div className="mt-3 text-3xl font-bold text-red-700">
            {deadJobs.length}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-950">
            Circuit Breakers
          </h2>
        </div>

        <div className="divide-y divide-slate-100">
          {Object.entries(circuits).length === 0 && (
            <div className="p-6 text-sm text-slate-500">
              Aucun circuit breaker.
            </div>
          )}

          {Object.entries(circuits).map(
            ([key, circuit]) => (
              <div
                key={key}
                className="p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      {key}
                    </div>

                    <div className="mt-1 text-xs text-slate-500">
                      Failures : {circuit.failures}
                    </div>
                  </div>

                  <div
                    className="
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-medium
                      bg-slate-100
                      text-slate-700
                    "
                  >
                    {circuit.state}
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

Write-Host "=== REALTIME METRICS DASHBOARD connecté ===" -ForegroundColor Green