"use client";

import {
  ERPDashboardLayout,
} from "../layout";

import {
  ERPStack,
} from "../ui";

import {
  ERPRuntimeStatusPanel,
  ERPRuntimeMetricsPanel,
  ERPRuntimeAlertsPanel,
  ERPRuntimeQueuesPanel,
  ERPRuntimeWorkersPanel,
  ERPRuntimeRetryPanel,
  ERPRuntimeDeadLetterPanel,
} from "./index";

export function ERPRuntimeOverviewPage() {

  return (

    <ERPDashboardLayout
      title="Runtime ERP"
      description="Cockpit runtime enterprise centralisé."
      activeModule="supervision"
    >

      <ERPStack gap="24px">

        <ERPRuntimeStatusPanel
          runtime={{
            status: "healthy",
            modules: 18,
            workers: 12,
            queues: 5,
            retries: 2,
          }}
        />

        <ERPRuntimeMetricsPanel
          metrics={[
            {
              title: "Events",
              value: 12450,
              helper: "Runtime events",
            },
            {
              title: "Queues",
              value: 5,
              helper: "Queues actives",
            },
            {
              title: "Workers",
              value: 12,
              helper: "Workers runtime",
            },
            {
              title: "Retries",
              value: 2,
              helper: "Retries actifs",
            },
          ]}
        />

        <ERPRuntimeAlertsPanel
          alerts={[
            {
              id: "1",
              title:
                "Queue latency detected",
              level: "warning",
            },
          ]}
        />

        <ERPRuntimeQueuesPanel
          queues={[
            {
              id: "1",
              queue: "erp-events",
              status: "running",
            },
            {
              id: "2",
              queue: "erp-mails",
              status: "pending",
            },
          ]}
        />

        <ERPRuntimeWorkersPanel
          workers={[
            {
              id: "1",
              module: "stocks",
              status: "running",
            },
            {
              id: "2",
              module: "paiements",
              status: "idle",
            },
          ]}
        />

        <ERPRuntimeRetryPanel
          retries={[
            {
              jobId: "JOB-1001",
              retries: 2,
              status: "retrying",
            },
          ]}
        />

        <ERPRuntimeDeadLetterPanel
          deadLetters={[
            {
              id: "1",
              event: "PAYMENT_FAILED",
              reason:
                "Webhook timeout",
            },
          ]}
        />

      </ERPStack>

    </ERPDashboardLayout>
  );
}