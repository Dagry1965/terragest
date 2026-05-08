import type {
  AutomationRuntimeRule,
  AutomationRuntimeTrigger,
} from "./AutomationRuntimeTypes";

function compare(
  current: unknown,
  operator: AutomationRuntimeTrigger["operator"],
  expected: unknown
): boolean {
  if (operator === "<") {
    return Number(current) < Number(expected);
  }

  if (operator === ">") {
    return Number(current) > Number(expected);
  }

  if (operator === "=") {
    return current === expected;
  }

  if (operator === "!=") {
    return current !== expected;
  }

  return false;
}

export class AutomationRuntimeTriggerEngine {
  static matches(
    rule: AutomationRuntimeRule,
    payload: Record<string, unknown> = {}
  ): boolean {
    if (!rule.enabled) {
      return false;
    }

    if (rule.trigger.type === "manual") {
      return true;
    }

    if (rule.trigger.type === "event") {
      return true;
    }

    if (rule.trigger.type === "workflow_blocked") {
      return payload.workflowBlocked === true;
    }

    if (rule.trigger.type === "maintenance_overdue") {
      return payload.maintenanceOverdue === true;
    }

    if (rule.trigger.type === "threshold") {
      if (!rule.trigger.field) {
        return false;
      }

      return compare(
        payload[rule.trigger.field],
        rule.trigger.operator,
        rule.trigger.value
      );
    }

    return false;
  }
}