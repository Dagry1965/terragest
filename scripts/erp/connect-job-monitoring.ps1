Write-Host "=== TERRAGEST_V2 - CONNECT JOB MONITORING ===" -ForegroundColor Cyan

$file = "src/components/erp/command-center/ERPCommandCenter.tsx"

$content = Get-Content $file -Raw

$content = $content -replace 'import \{
\s+getRuntimeTimeline,
\s+\} from "@\/core\/runtime\/runtime-timeline";',
'import {
  getRuntimeTimeline,
} from "@/core/runtime/runtime-timeline";

import {
  getJobQueue,
} from "@/core/jobs/job-queue";'

$content = $content -replace 'const runtime =
\s+getRuntimeTimeline\(\);',
'const runtime =
    getRuntimeTimeline();

  const jobs =
    getJobQueue();'

$content = $content -replace 'const eventCount =
\s+runtime\.filter\(
\s+\(entry\) =>
\s+entry\.type === "event"
\s+\)\.length;',
'const eventCount =
    runtime.filter(
      (entry) =>
        entry.type === "event"
    ).length;

  const pendingJobs =
    jobs.filter(
      (job) =>
        job.status === "pending"
    ).length;

  const runningJobs =
    jobs.filter(
      (job) =>
        job.status === "running"
    ).length;

  const completedJobs =
    jobs.filter(
      (job) =>
        job.status === "completed"
    ).length;'

$content = $content -replace '</section>\s+<section className="rounded-2xl border border-slate-200 bg-white shadow-sm">',
'</section>

      <section className="grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Pending Jobs
          </div>

          <div className="mt-3 text-3xl font-bold text-slate-950">
            {pendingJobs}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Running Jobs
          </div>

          <div className="mt-3 text-3xl font-bold text-blue-600">
            {runningJobs}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Completed Jobs
          </div>

          <div className="mt-3 text-3xl font-bold text-emerald-600">
            {completedJobs}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-950">
            Job Queue
          </h2>
        </div>

        <div className="divide-y divide-slate-100">
          {jobs.length === 0 && (
            <div className="p-6 text-sm text-slate-500">
              Aucun job ERP.
            </div>
          )}

          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-slate-200 px-2 py-1 text-xs font-medium text-slate-700">
                      {job.module}
                    </span>

                    <span className="rounded-full bg-violet-100 px-2 py-1 text-xs font-medium text-violet-700">
                      {job.priority}
                    </span>

                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                      {job.status}
                    </span>
                  </div>

                  <div className="mt-3 text-sm font-medium text-slate-900">
                    {job.name}
                  </div>

                  <div className="mt-2 text-xs text-slate-400">
                    Retries : {job.retries}
                  </div>
                </div>

                <div className="text-xs text-slate-400">
                  {job.createdAt}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">'

Set-Content $file $content

Write-Host "=== JOB MONITORING connecté au COMMAND CENTER ===" -ForegroundColor Green