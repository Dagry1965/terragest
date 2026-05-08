import {
  getAutomationsRegistry,
} from "@/core/automation/registry/automation-registry";

import {
  getMetrics,
} from "@/core/metrics/metrics-engine";

import {
  getDeadJobs,
} from "@/core/dead-letter/dead-letter-queue";

import {
  getCircuits,
} from "@/core/circuit-breaker/circuit-breaker-engine";

import {
  getRuntimeTimeline,
} from "@/core/runtime/runtime-timeline";
import {
  getJobQueue,
} from "@/core/jobs/job-queue";

export function ERPCommandCenter() {
  const runtime =
    getRuntimeTimeline();

  const jobs =
    getJobQueue();

  const metrics =
    getMetrics();

  const deadJobs =
    getDeadJobs();

  const circuits =
    getCircuits();

  const automations =
    getAutomationsRegistry();

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
          Observability, supervision, runtime timeline,
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



