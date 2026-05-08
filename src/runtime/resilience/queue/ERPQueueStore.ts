import type { ERPQueueJob } from "./ERPQueueJob";

class ERPQueueStoreClass {
  private jobs: ERPQueueJob[] = [];

  add(job: ERPQueueJob) {
    this.jobs.unshift(job);
    this.jobs = this.jobs.slice(0, 300);
  }

  update(id: string, patch: Partial<ERPQueueJob>) {
    this.jobs = this.jobs.map((job) =>
      job.id === id
        ? {
            ...job,
            ...patch,
            updatedAt: new Date().toISOString(),
          }
        : job
    );
  }

  all() {
    return this.jobs;
  }

  pending() {
    return this.jobs.filter((job) => job.status === "pending");
  }

  byStatus(status: ERPQueueJob["status"]) {
    return this.jobs.filter((job) => job.status === status);
  }
}

export const ERPQueueStore = new ERPQueueStoreClass();