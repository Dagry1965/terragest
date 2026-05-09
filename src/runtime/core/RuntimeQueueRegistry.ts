export interface RuntimeQueueJob {

  id: string;

  queue: string;

  payload?: unknown;

  status:
    | "pending"
    | "running"
    | "completed"
    | "failed";

  createdAt: string;
}

export class RuntimeQueueRegistry {

  private jobs:
    RuntimeQueueJob[] = [];

  enqueue(
    job: RuntimeQueueJob
  ) {

    this.jobs.push(job);
  }

  getJobs() {

    return this.jobs;
  }

  getQueueJobs(
    queue: string
  ) {

    return this.jobs.filter(
      job =>
        job.queue === queue
    );
  }

  getPendingJobs() {

    return this.jobs.filter(
      job =>
        job.status === "pending"
    );
  }

  getFailedJobs() {

    return this.jobs.filter(
      job =>
        job.status === "failed"
    );
  }
}

export const runtimeQueueRegistry =
  new RuntimeQueueRegistry();