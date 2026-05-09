"use client";

import {
  ERPBadge,
  ERPPanel,
  ERPTable,
} from "../ui";

interface ERPRuntimeQueuesPanelProps {
  queues: {
    id: string;
    queue: string;
    status: "pending" | "running" | "completed" | "failed";
  }[];
}

export function ERPRuntimeQueuesPanel({
  queues,
}: ERPRuntimeQueuesPanelProps) {
  return (
    <ERPPanel
      title="Runtime Queues"
      description="État des files runtime."
    >
      <ERPTable
        columns={[
          { key: "queue", label: "Queue" },
          {
            key: "status",
            label: "Status",
            render: value => {
              const status = String(value);

              return (
                <ERPBadge
                  tone={
                    status === "completed"
                      ? "success"
                      : status === "failed"
                      ? "danger"
                      : status === "running"
                      ? "info"
                      : "warning"
                  }
                >
                  {status}
                </ERPBadge>
              );
            },
          },
        ]}
        rows={queues.map(queue => ({
          id: queue.id,
          queue: queue.queue,
          status: queue.status,
        }))}
      />
    </ERPPanel>
  );
}