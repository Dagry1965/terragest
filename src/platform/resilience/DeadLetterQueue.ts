// src/platform/resilience/DeadLetterQueue.ts

export interface FailedJob {

  workflow: string;

  error: unknown;

  timestamp: Date;
}

class DeadLetterQueueManager {

  private failedJobs: FailedJob[] = [];

  add(
    job: FailedJob
  ) {

    console.error(
      "[DLQ]",
      job.workflow,
      job.error
    );

    this.failedJobs.push(job);
  }

  getFailedJobs() {

    return this.failedJobs;
  }

  clear() {

    this.failedJobs = [];
  }
}

export const DeadLetterQueue =
  new DeadLetterQueueManager();