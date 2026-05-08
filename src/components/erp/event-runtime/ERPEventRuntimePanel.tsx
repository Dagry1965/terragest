"use client";

import { useState } from "react";
import { ERPBadge, ERPButton } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import {
  ERPEventRuntimeBus,
  ERPEventRuntimeOrchestrator,
  ERPEventRuntimeSubscriptionRegistry,
  type ERPEventRuntimeEvent,
} from "@/runtime/event-runtime";

interface ERPEventRuntimePanelProps {
  module: ERPModule;
}

export function ERPEventRuntimePanel({
  module,
}: ERPEventRuntimePanelProps) {
  const [events, setEvents] =
    useState<ERPEventRuntimeEvent[]>(
      ERPEventRuntimeBus.replay(module.metadata.key)
    );

  const subscriptions =
    ERPEventRuntimeSubscriptionRegistry.forModule(
      module.metadata.key
    );

  function refresh() {
    setEvents([
      ...ERPEventRuntimeBus.replay(module.metadata.key),
    ]);
  }

  function simulateBreakdown() {
    ERPEventRuntimeOrchestrator.simulateMaterielBreakdown();
    refresh();
  }

  function simulateStock() {
    ERPEventRuntimeOrchestrator.simulateStockCritical();
    refresh();
  }

  function simulateWorkflow() {
    ERPEventRuntimeOrchestrator.simulateWorkflowCompleted();
    refresh();
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-950">
            Event runtime cross-modules
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Propagation et orchestration entre modules ERP.
          </p>
        </div>

        <ERPBadge tone="info">
          {subscriptions.length} subscriptions
        </ERPBadge>
      </div>

      <div className="mb-5 flex flex-wrap gap-3">
        <ERPButton type="button" onClick={simulateBreakdown}>
          Simuler panne materiel
        </ERPButton>

        <ERPButton variant="secondary" type="button" onClick={simulateStock}>
          Simuler stock critique
        </ERPButton>

        <ERPButton variant="ghost" type="button" onClick={simulateWorkflow}>
          Simuler workflow termine
        </ERPButton>
      </div>

      <div className="mb-5 rounded-2xl bg-slate-50 p-4">
        <h3 className="text-sm font-black text-slate-900">
          Subscriptions module
        </h3>

        <div className="mt-3 space-y-2">
          {subscriptions.length === 0 ? (
            <p className="text-sm text-slate-500">
              Aucune subscription declaree pour ce module.
            </p>
          ) : (
            subscriptions.map((subscription) => (
              <div
                key={subscription.id}
                className="rounded-xl bg-white p-3 text-sm text-slate-600"
              >
                {subscription.eventName} - {subscription.handlerLabel}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="rounded-2xl bg-slate-50 p-4">
        <h3 className="text-sm font-black text-slate-900">
          Evenements recus
        </h3>

        <div className="mt-3 space-y-2">
          {events.length === 0 ? (
            <p className="text-sm text-slate-500">
              Aucun evenement runtime.
            </p>
          ) : (
            events.slice(0, 8).map((event) => (
              <div
                key={event.id}
                className="rounded-xl bg-white p-3 text-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-slate-900">
                      {event.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {event.sourceModule} vers {event.targetModules.join(", ")}
                    </p>
                  </div>

                  <ERPBadge tone={event.level}>
                    {event.level}
                  </ERPBadge>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}