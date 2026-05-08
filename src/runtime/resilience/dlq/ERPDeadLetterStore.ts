import type { ERPQueueJob } from "../queue/ERPQueueJob";

class ERPDeadLetterStoreClass {
  private jobs: ERPQueueJob[] = [];

  add(job: ERPQueueJob) {
    this.jobs.unshift({
      ...job,
      status: "dead_letter",
      updatedAt: new Date().toISOString(),
    });

    this.jobs = this.jobs.slice(0, 200);
  }

  all() {
    return this.jobs;
  }
}

export const ERPDeadLetterStore = new ERPDeadLetterStoreClass();