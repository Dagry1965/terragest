export * from "./RuntimeOperationalCockpitResolver";
export * from "./RuntimeOperationalCockpitTypes";

export type ERPCockpitHealthStatus =
  | "healthy"
  | "warning"
  | "critical";

export type ERPCockpitSnapshot = {
  [key: string]: any;

  status: ERPCockpitHealthStatus;
  generatedAt: string;

  modulesCount: number;
  schemasCount: number;
  workflowsCount: number;
  queuesCount: number;
  actionsCount: number;
  eventsCount: number;
  automationsCount: number;
  alertsCount: number;

  modules: Array<any>;

  queues: {
    pending: number;
    running: number;
    failed: number;
  };

  workflows: {
    active: number;
    failed: number;
  };

  automations: {
    active: number;
    failed: number;
  };

  firestore: {
    status: ERPCockpitHealthStatus;
    latencyMs?: number;
  };

  alerts: Array<{
    id: string;
    label: string;
    severity: ERPCockpitHealthStatus;
  }>;
};

export function getERPCockpitSnapshot(): ERPCockpitSnapshot {
  return {
    status: "healthy",
    generatedAt: new Date().toISOString(),

    modulesCount: 1,
    schemasCount: 1,
    workflowsCount: 0,
    queuesCount: 0,
    actionsCount: 0,
    eventsCount: 0,
    automationsCount: 0,
    alertsCount: 0,

    modules: [
      {
        key: "amarkhys",
        label: "AMARKHYS",
        schema: {
          fields: [],
        },
        actions: [],
        workflows: [],
        events: [],
        automation: [],
      },
    ],

    queues: {
      pending: 0,
      running: 0,
      failed: 0,
    },

    workflows: {
      active: 0,
      failed: 0,
    },

    automations: {
      active: 0,
      failed: 0,
    },

    firestore: {
      status: "healthy",
    },

    alerts: [],
  };
}