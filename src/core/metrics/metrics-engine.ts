export type ERPMetrics = {
  processedJobs: number;

  failedJobs: number;

  retriedJobs: number;

  deadJobs: number;

  workflowExecutions: number;

  runtimeEvents: number;
};

const metrics:
  ERPMetrics = {
    processedJobs: 0,

    failedJobs: 0,

    retriedJobs: 0,

    deadJobs: 0,

    workflowExecutions: 0,

    runtimeEvents: 0,
  };

export function incrementMetric(
  key: keyof ERPMetrics
) {
  metrics[key] += 1;

  console.log(
    "ERP METRIC UPDATED",
    key,
    metrics[key]
  );
}

export function getMetrics() {
  return metrics;
}
