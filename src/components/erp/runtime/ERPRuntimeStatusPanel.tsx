"use client";

import {
  ERPBadge,
  ERPDataList,
  ERPPanel,
} from "../ui";

interface ERPRuntimeStatusPanelProps {

  runtime: {

    status: string;

    modules: number;

    workers: number;

    queues: number;

    retries: number;
  };
}

export function ERPRuntimeStatusPanel({
  runtime,
}: ERPRuntimeStatusPanelProps) {

  return (

    <ERPPanel
      title="Runtime ERP"
      description="État global du runtime enterprise."
      actions={

        <ERPBadge
          tone={
            runtime.status === "healthy"
              ? "success"
              : "warning"
          }
        >
          {runtime.status}
        </ERPBadge>
      }
    >

      <ERPDataList
        items={[
          {
            label: "Modules",
            value: runtime.modules,
          },
          {
            label: "Workers",
            value: runtime.workers,
          },
          {
            label: "Queues",
            value: runtime.queues,
          },
          {
            label: "Retries",
            value: runtime.retries,
          },
        ]}
      />

    </ERPPanel>
  );
}