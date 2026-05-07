export type ERPJobPriority =
  | "low"
  | "normal"
  | "critical";

export type ERPJob = {
  id: string;

  name: string;

  module: string;

  payload?: any;

  priority: ERPJobPriority;

  status:
    | "pending"
    | "running"
    | "completed"
    | "failed";

  retries: number;

  createdAt: string;
};

const jobQueue:
  ERPJob[] = [];

export function enqueueJob(
  job: Omit<
    ERPJob,
    "id" |
    "status" |
    "retries" |
    "createdAt"
  >
) {
  const runtimeJob:
    ERPJob = {
      id:
        `JOB-${Date.now()}-${Math.random()}`,

      status: "pending",

      retries: 0,

      createdAt:
        new Date().toISOString(),

      ...job,
    };

  jobQueue.push(runtimeJob);

  console.log(
    "ERP JOB ENQUEUED",
    runtimeJob
  );

  return runtimeJob;
}

export function getJobQueue() {
  return jobQueue;
}

export function getPendingJobs() {
  return jobQueue.filter(
    (job) =>
      job.status === "pending"
  );
}
