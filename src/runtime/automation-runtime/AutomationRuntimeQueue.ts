import type {
  AutomationRuntimeJob,
  AutomationRuntimeRule,
} from "./AutomationRuntimeTypes";

const queue: AutomationRuntimeJob[] = [];
const deadLetters: AutomationRuntimeJob[] = [];

export class AutomationRuntimeQueue {
  static enqueue(rule: AutomationRuntimeRule): AutomationRuntimeJob {
    const now = new Date().toISOString();

    const job: AutomationRuntimeJob = {
      id: `${rule.key}-${Date.now()}`,
      ruleKey: rule.key,
      moduleKey: rule.moduleKey,
      status: "pending",
      attempts: 0,
      maxAttempts: 3,
      createdAt: now,
      updatedAt: now,
      actions: rule.actions,
    };

    queue.unshift(job);

    return job;
  }

  static all(): AutomationRuntimeJob[] {
    return queue;
  }

  static pending(): AutomationRuntimeJob[] {
    return queue.filter((job) => job.status === "pending");
  }

  static update(job: AutomationRuntimeJob): AutomationRuntimeJob {
    job.updatedAt = new Date().toISOString();

    const index = queue.findIndex((item) => item.id === job.id);

    if (index >= 0) {
      queue[index] = job;
    }

    return job;
  }

  static moveToDeadLetter(job: AutomationRuntimeJob): AutomationRuntimeJob {
    job.status = "dead_letter";
    job.updatedAt = new Date().toISOString();

    deadLetters.unshift(job);

    AutomationRuntimeQueue.update(job);

    return job;
  }

  static deadLetters(): AutomationRuntimeJob[] {
    return deadLetters;
  }
}