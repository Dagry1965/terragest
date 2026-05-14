"use client";

import { useEffect, useState } from "react";

import { ERPCard } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPModuleBuilder } from "@/runtime/modules";
import { ERPRuntimeFieldValue } from "./ERPRuntimeFieldValue";

import type {
  WorkflowHistoryEntry,
}
from "@/runtime/workflow-persistence/WorkflowHistoryEntry";

import {
  WorkflowHistoryRepository,
}
from "@/runtime/workflow-persistence/WorkflowHistoryRepository";

interface ERPRuntimeDetailsProps {
  module: ERPModule;
  data?: Record<string, unknown>;
}

export function ERPRuntimeDetails({
  module,
  data = {},
}: ERPRuntimeDetailsProps) {
  const details = ERPModuleBuilder.buildDetails(module);

  const [timeline, setTimeline] =
    useState<WorkflowHistoryEntry[]>([]);

  const [loadingTimeline, setLoadingTimeline] =
    useState(false);

  const entityId =
    String(
      (data as any)?.id ??
      (data as any)?.uid ??
      (data as any)?.key ??
      ""
    );

  useEffect(() => {
    let mounted = true;

    async function loadTimeline() {
      if (!entityId) {
        setTimeline([]);
        return;
      }

      setLoadingTimeline(true);

      try {
        const history =
          await WorkflowHistoryRepository.findByEntity(
            module.metadata.key,
            entityId
          );

        if (mounted) {
          setTimeline(history);
        }
      } finally {
        if (mounted) {
          setLoadingTimeline(false);
        }
      }
    }

    loadTimeline();

    return () => {
      mounted = false;
    };
  }, [module.metadata.key, entityId]);

  return (
    <div className="space-y-6">
      <ERPCard
        title={`Détails ${module.metadata.label}`}
        description="Vue détail générée automatiquement par le Runtime ERP."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {details.fields.map((field) => (
            <div
              key={field.key}
              className="rounded-xl border border-slate-800 bg-slate-950 p-4"
            >
              <p className="text-xs uppercase tracking-wide text-slate-500">
                {field.label}
              </p>

              <div className="mt-2 text-sm text-slate-100">
                <ERPRuntimeFieldValue
                  field={field}
                  value={data[field.key]}
                />
              </div>
            </div>
          ))}
        </div>
      </ERPCard>

      <ERPCard
        title="Timeline workflow"
        description="Historique persistant des transitions workflow."
      >
        {loadingTimeline ? (
          <p className="text-sm text-slate-500">
            Chargement de la timeline...
          </p>
        ) : timeline.length === 0 ? (
          <p className="text-sm text-slate-500">
            Aucune transition workflow enregistrée pour cet élément.
          </p>
        ) : (
          <div className="space-y-3">
            {timeline.map((item, index) => (
              <div
                key={`${item.entityId}-${item.action}-${index}`}
                className="rounded-xl border border-slate-800 bg-slate-950 p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold text-slate-100">
                    {item.fromState} → {item.toState}
                  </p>

                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                    {item.action}
                  </span>
                </div>

                {item.comment && (
                  <p className="mt-2 text-sm text-slate-400">
                    {item.comment}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </ERPCard>
    </div>
  );
}