import { AutomationRuntimeRegistry } from "./AutomationRuntimeRegistry";
import { AutomationRuntimeTriggerEngine } from "./AutomationRuntimeTriggerEngine";
import { AutomationRuntimeQueue } from "./AutomationRuntimeQueue";
import { AutomationRuntimeExecutor } from "./AutomationRuntimeExecutor";

export class AutomationRuntimeEngine {
  static evaluate(
    moduleKey: string,
    payload: Record<string, unknown> = {}
  ) {
    const rules = AutomationRuntimeRegistry.forModule(moduleKey);

    const jobs = rules
      .filter((rule) =>
        AutomationRuntimeTriggerEngine.matches(rule, payload)
      )
      .map((rule) => AutomationRuntimeQueue.enqueue(rule));

    return jobs;
  }

  static async runPending() {
    const jobs = AutomationRuntimeQueue.pending();

    for (const job of jobs) {
      await AutomationRuntimeExecutor.execute(job);
    }

    return AutomationRuntimeQueue.all();
  }

  static async triggerManual(ruleKey: string) {
    const rule = AutomationRuntimeRegistry.get(ruleKey);

    if (!rule) {
      throw new Error(`Automation introuvable: ${ruleKey}`);
    }

    const job = AutomationRuntimeQueue.enqueue(rule);

    return AutomationRuntimeExecutor.execute(job);
  }
}