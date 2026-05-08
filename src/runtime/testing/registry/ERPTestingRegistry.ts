import type {
  ERPTestCase,
} from "../engine/ERPTestingTypes";

export const ERPTestingRegistry:
  ERPTestCase[] = [

  {
    id: "workflow_maintenance",
    label: "Workflow Maintenance",
    type: "workflow",
    module: "maintenance",
    status: "passed",
    duration: 240,
    updatedAt: new Date().toISOString(),
  },

  {
    id: "worker_payments",
    label: "Worker Payments",
    type: "worker",
    module: "paiements",
    status: "passed",
    duration: 320,
    updatedAt: new Date().toISOString(),
  },

  {
    id: "tenant_isolation",
    label: "Tenant Isolation",
    type: "tenant",
    module: "runtime",
    status: "passed",
    duration: 180,
    updatedAt: new Date().toISOString(),
  },

  {
    id: "security_rbac",
    label: "Security RBAC",
    type: "security",
    module: "security",
    status: "failed",
    duration: 150,
    updatedAt: new Date().toISOString(),
  },

  {
    id: "monitoring_center",
    label: "Monitoring Center",
    type: "monitoring",
    module: "monitoring",
    status: "passed",
    duration: 200,
    updatedAt: new Date().toISOString(),
  },

  {
    id: "automation_runtime",
    label: "Automation Runtime",
    type: "automation",
    module: "automation",
    status: "passed",
    duration: 280,
    updatedAt: new Date().toISOString(),
  },
];