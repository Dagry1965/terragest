"use client";

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
  getStoredEvents,
} from "@/core/event-store/event-store";

import {
  getAutomationsRegistry,
} from "@/core/automation/registry/automation-registry";

export function ERPExecutiveDashboard() {
  const metrics =
    getMetrics();

  const deadJobs =
    getDeadJobs();

  const circuits =
    getCircuits();

  const events =
    getStoredEvents();

  const automations =
    getAutomationsRegistry();

  const activeCircuits =
    Object.values(
      circuits
    ).filter(
      (circuit) =>
        circuit.state ===
        "open"
    ).length;

  return (
    <div className="space-y-8">
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Processed Jobs
          </div>

          <div className="mt-4 text-4xl font-bold text-slate-950">
            {metrics.processedJobs}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Runtime Events
          </div>

          <div className="mt-4 text-4xl font-bold text-slate-950">
            {events.length}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Dead Jobs
          </div>

          <div className="mt-4 text-4xl font-bold text-red-600">
            {deadJobs.length}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Open Circuits
          </div>

          <div className="mt-4 text-4xl font-bold text-amber-600">
            {activeCircuits}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
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
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
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

                    <div
                      className={
                        automation
                          .metadata
                          .enabled
                          ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700"
                          : "rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700"
                      }
                    >
                      {automation
                        .metadata
                        .enabled
                        ? "enabled"
                        : "disabled"}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-lg font-semibold text-slate-950">
              Runtime Activity
            </h2>
          </div>

          <div className="divide-y divide-slate-100">
            {events.slice(0, 8).map(
              (event) => (
                <div
                  key={event.id}
                  className="p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        {
                          event.event
                            .name
                        }
                      </div>

                      <div className="mt-2 text-xs text-slate-500">
                        {
                          event.createdAt
                        }
                      </div>
                    </div>

                    <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      Runtime Event
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
