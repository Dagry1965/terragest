import type {
  ERPWorkerJob,
} from "../engine/ERPWorkerTypes";

class ERPWorkerHistoryStoreClass {

  private jobs:
    ERPWorkerJob[] = [];

  add(
    job: ERPWorkerJob
  ) {

    this.jobs.unshift(job);

    this.jobs =
      this.jobs.slice(0, 300);
  }

  all() {

    return this.jobs;
  }

  completed() {

    return this.jobs.filter(
      (job) =>
        job.status === "completed"
    );
  }

  failed() {

    return this.jobs.filter(
      (job) =>
        job.status === "failed"
    );
  }
}

export const ERPWorkerHistoryStore =
  new ERPWorkerHistoryStoreClass();