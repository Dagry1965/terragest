"use client";

import {
  ERPBadge,
  ERPPanel,
  ERPTable,
} from "../ui";

interface ERPRuntimeWorker {

  id: string;

  module: string;

  status:
    | "idle"
    | "running"
    | "stopped";
}

interface ERPRuntimeWorkersPanelProps {

  workers:
    ERPRuntimeWorker[];
}

export function ERPRuntimeWorkersPanel({
  workers,
}: ERPRuntimeWorkersPanelProps) {

  return (

    <ERPPanel
      title="Runtime Workers"
      description="Workers et exécuteurs runtime."
    >

      <ERPTable
        columns={[
          {
            key: "module",
            label: "Module",
          },
          {
            key: "status",
            label: "Status",
            render: value => {

              const status =
                String(value);

              return (

                <ERPBadge
                  tone={
                    status === "running"
                      ? "success"
                      : status === "idle"
                      ? "warning"
                      : "danger"
                  }
                >
                  {status}
                </ERPBadge>
              );
            },
          },
        ]}
        rows={
          workers.map(
            worker => ({
              id: worker.id,
              module: worker.module,
              status: worker.status,
            })
          )
        }
      />

    </ERPPanel>
  );
}