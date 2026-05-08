import type { AutomationRuntimeRule } from "./AutomationRuntimeTypes";
import { automationRuntimeRules } from "./AutomationRuntimeRules";

export class AutomationRuntimeRegistry {
  static all(): AutomationRuntimeRule[] {
    return automationRuntimeRules;
  }

  static forModule(moduleKey: string): AutomationRuntimeRule[] {
    return automationRuntimeRules.filter(
      (rule) => rule.moduleKey === moduleKey
    );
  }

  static get(ruleKey: string): AutomationRuntimeRule | undefined {
    return automationRuntimeRules.find((rule) => rule.key === ruleKey);
  }
}