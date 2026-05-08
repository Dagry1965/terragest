export type ERPTestStatus =
  | "pending"
  | "running"
  | "passed"
  | "failed";

export type ERPTestType =
  | "workflow"
  | "worker"
  | "security"
  | "tenant"
  | "queue"
  | "automation"
  | "monitoring"
  | "integration";

export type ERPTestCase = {
  id: string;
  label: string;
  type: ERPTestType;
  module: string;
  status: ERPTestStatus;
  duration: number;
  updatedAt: string;
};

export type ERPTestReport = {
  total: number;
  passed: number;
  failed: number;
  successRate: number;
};