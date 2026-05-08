import { AutomationRuntimeEngine } from "./AutomationRuntimeEngine";

export class AutomationRuntimeScheduler {
  static async tick() {
    return AutomationRuntimeEngine.runPending();
  }
}