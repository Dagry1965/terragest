export const ERP_RUNTIME_PIPELINE = [
  "event",
  "rule",
  "workflow",
  "state",
  "permission",
  "persistence",
  "notification",
  "observability",
] as const;

export type ERPRuntimePipelineStep =
  typeof ERP_RUNTIME_PIPELINE[number];
