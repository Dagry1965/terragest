"use client";

import { useState } from "react";
import { ERPBadge, ERPButton } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import {
  AutomationRuntimeEngine,
  AutomationRuntimeQueue,
  AutomationRuntimeRegistry,
  type AutomationRuntimeJob,
} from "@/runtime/automation-runtime";

interface ERPAutomationRuntimePanelProps {
  module: ERPModule;
}

export function ERPAutomationRuntimePanel({
  module,
}: ERPAutomationRuntimePanelProps) {
  const rules = AutomationRuntimeRegistry.forModule(module.metadata.key);

  const [jobs, setJobs] =
    useState<AutomationRuntimeJob[]>(AutomationRuntimeQueue.all());

  function simulate() {
    AutomationRuntimeEngine.evaluate(module.metadata.key, {
      quantite: 5,
      maintenanceOverdue: true,
      workflowBlocked: true,
    });

    setJobs([...AutomationRuntimeQueue.all()]);
  }

  async function runPending() {
    await AutomationRuntimeEngine.runPending();
    setJobs([...AutomationRuntimeQueue.all()]);
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-950">
            Automation runtime
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Regles automatiques du module {module.metadata.label}.
          </p>
        </div>

        <ERPBadge tone="info">{rules.length} regles</ERPBadge>
      </div>

      <div className="mb-5 space-y-3">
        {rules.length === 0 ? (
          <p className="text-sm text-slate-500">
            Aucune automation declaree pour ce module.
          </p>
        ) : (
          rules.map((rule) => (
            <div
              key={rule.key}
              className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-slate-900">
                    {rule.label}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {rule.description}
                  </p>
                </div>

                <ERPBadge tone={rule.enabled ? "success" : "warning"}>
                  {rule.enabled ? "active" : "inactive"}
                </ERPBadge>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mb-5 flex flex-wrap gap-3">
        <ERPButton type="button" onClick={simulate}>
          Simuler evenement
        </ERPButton>

        <ERPButton variant="secondary" type="button" onClick={runPending}>
          Executer queue
        </ERPButton>
      </div>

      <div className="rounded-2xl bg-slate-50 p-4">
        <h3 className="text-sm font-black text-slate-900">
          Jobs automation
        </h3>

        <div className="mt-3 space-y-2">
          {jobs.length === 0 ? (
            <p className="text-sm text-slate-500">
              Aucun job automation.
            </p>
          ) : (
            jobs.slice(0, 6).map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between rounded-xl bg-white p-3 text-sm"
              >
                <span className="font-medium text-slate-700">
                  {job.ruleKey}
                </span>

                <ERPBadge tone={job.status === "completed" ? "success" : "info"}>
                  {job.status}
                </ERPBadge>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}