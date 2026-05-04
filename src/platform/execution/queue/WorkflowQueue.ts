// src/platform/execution/queue/WorkflowQueue.ts

export interface WorkflowJob {

  id: string;

  workflow: string;

  payload?: unknown;

  priority?: number;
}

class WorkflowQueueManager {

  private jobs:
    WorkflowJob[] = [];

  enqueue(
    job: WorkflowJob
  ) {

    console.log(
      "[QUEUE] enqueue",
      job.workflow
    );

    this.jobs.push(job);

    this.jobs.sort(
      (a, b) =>
        (b.priority || 0)
        - (a.priority || 0)
    );
  }

  dequeue() {

    return this.jobs.shift();
  }

  getJobs() {

    return this.jobs;
  }
}

export const WorkflowQueue =
  new WorkflowQueueManager();