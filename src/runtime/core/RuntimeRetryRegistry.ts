export interface RuntimeRetryJob {

  jobId: string;

  retries: number;

  lastRetryAt?: string;

  status:
    | "pending"
    | "retrying"
    | "failed"
    | "resolved";
}

export class RuntimeRetryRegistry {

  private jobs:
    RuntimeRetryJob[] = [];

  registerRetry(
    job: RuntimeRetryJob
  ) {

    this.jobs.push(job);
  }

  getRetries() {

    return this.jobs;
  }

  getFailedRetries() {

    return this.jobs.filter(
      job =>
        job.status === "failed"
    );
  }

  getRetryingJobs() {

    return this.jobs.filter(
      job =>
        job.status === "retrying"
    );
  }
}

export const runtimeRetryRegistry =
  new RuntimeRetryRegistry();