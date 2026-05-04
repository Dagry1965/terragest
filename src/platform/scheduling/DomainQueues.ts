// src/platform/scheduling/DomainQueues.ts

import {
  WorkflowJob
}
from "@/platform/execution/queue/WorkflowQueue";

class DomainQueuesManager {

  private queues:
    Record<string, WorkflowJob[]>
    = {};

  enqueue(
    domain: string,
    job: WorkflowJob
  ) {

    if (!this.queues[domain]) {

      this.queues[domain] = [];
    }

    this.queues[domain]
      .push(job);

    this.queues[domain]
      .sort(
        (a, b) =>
          (b.priority || 0)
          - (a.priority || 0)
      );

    console.log(
      `[DOMAIN QUEUE]
       ${domain}
       enqueue`
    );
  }

  dequeue(
    domain: string
  ) {

    return this.queues[domain]
      ?.shift();
  }

  getQueues() {

    return this.queues;
  }
}

export const DomainQueues =
  new DomainQueuesManager();