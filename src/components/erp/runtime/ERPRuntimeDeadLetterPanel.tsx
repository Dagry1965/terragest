"use client";

import {
  ERPBadge,
  ERPPanel,
  ERPTable,
} from "../ui";

interface ERPRuntimeDeadLetter {

  id: string;

  event: string;

  reason: string;
}

interface ERPRuntimeDeadLetterPanelProps {

  deadLetters:
    ERPRuntimeDeadLetter[];
}

export function ERPRuntimeDeadLetterPanel({
  deadLetters,
}: ERPRuntimeDeadLetterPanelProps) {

  return (

    <ERPPanel
      title="Dead Letter Queue"
      description="Événements runtime en erreur."
    >

      <ERPTable
        columns={[
          {
            key: "event",
            label: "Event",
          },
          {
            key: "reason",
            label: "Reason",
          },
          {
            key: "status",
            label: "Status",
            render: () => (

              <ERPBadge
                tone="danger"
              >
                failed
              </ERPBadge>
            ),
          },
        ]}
        rows={
          deadLetters.map(
            item => ({
              id: item.id,
              event: item.event,
              reason: item.reason,
              status: "failed",
            })
          )
        }
      />

    </ERPPanel>
  );
}