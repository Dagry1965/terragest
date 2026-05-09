"use client";

import {
  ERPBadge,
  ERPPanel,
  ERPTable,
} from "../ui";

interface ERPRuntimeRetry {

  jobId: string;

  retries: number;

  status:
    | "retrying"
    | "failed"
    | "resolved";
}

interface ERPRuntimeRetryPanelProps {

  retries:
    ERPRuntimeRetry[];
}

export function ERPRuntimeRetryPanel({
  retries,
}: ERPRuntimeRetryPanelProps) {

  return (

    <ERPPanel
      title="Runtime Retries"
      description="Suivi des retries runtime."
    >

      <ERPTable
        columns={[
          {
            key: "jobId",
            label: "Job",
          },
          {
            key: "retries",
            label: "Retries",
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
                    status === "resolved"
                      ? "success"
                      : status === "retrying"
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
          retries.map(
            retry => ({
              jobId: retry.jobId,
              retries: retry.retries,
              status: retry.status,
            })
          )
        }
      />

    </ERPPanel>
  );
}