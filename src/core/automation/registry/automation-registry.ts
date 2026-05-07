import {
  AutomationRule,
} from "@/core/automation/automation-engine";

type AutomationMetadata = {
  enabled: boolean;

  createdAt: string;

  executions: number;
};

const automationRegistry =
  new Map<
    string,
    {
      rule: AutomationRule;
      metadata:
        AutomationMetadata;
    }
  >();

export function registerAutomationRule(
  rule: AutomationRule
) {
  automationRegistry.set(
    rule.id,
    {
      rule,
      metadata: {
        enabled: true,

        createdAt:
          new Date().toISOString(),

        executions: 0,
      },
    }
  );

  console.log(
    "ERP AUTOMATION REGISTRY",
    rule.name
  );
}

export function incrementAutomationExecution(
  ruleId: string
) {
  const automation =
    automationRegistry.get(
      ruleId
    );

  if (!automation) {
    return;
  }

  automation.metadata.executions += 1;
}

export function getAutomationsRegistry() {
  return Array.from(
    automationRegistry.values()
  );
}

export function disableAutomation(
  ruleId: string
) {
  const automation =
    automationRegistry.get(
      ruleId
    );

  if (!automation) {
    return;
  }

  automation.metadata.enabled =
    false;
}

export function enableAutomation(
  ruleId: string
) {
  const automation =
    automationRegistry.get(
      ruleId
    );

  if (!automation) {
    return;
  }

  automation.metadata.enabled =
    true;
}
