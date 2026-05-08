import type {
  AutomationRuntimeAction,
  AutomationRuntimeJob,
} from "./AutomationRuntimeTypes";
import { AutomationRuntimeQueue } from "./AutomationRuntimeQueue";

export class AutomationRuntimeExecutor {
  static async executeAction(
    action: AutomationRuntimeAction,
    job: AutomationRuntimeJob
  ): Promise<void> {
    console.log("AUTOMATION ACTION", {
      job: job.id,
      type: action.type,
      label: action.label,
      payload: action.payload,
    });
  }

  static async execute(job: AutomationRuntimeJob): Promise<AutomationRuntimeJob> {
    job.status = "running";
    job.attempts += 1;

    AutomationRuntimeQueue.update(job);

    try {
      for (const action of job.actions) {
        await AutomationRuntimeExecutor.executeAction(action, job);
      }

      job.status = "completed";
      job.error = undefined;

      return AutomationRuntimeQueue.update(job);
    } catch (error) {
      job.error =
        error instanceof Error ? error.message : "Erreur automation";

      if (job.attempts >= job.maxAttempts) {
        return AutomationRuntimeQueue.moveToDeadLetter(job);
      }

      job.status = "failed";

      return AutomationRuntimeQueue.update(job);
    }
  }
}