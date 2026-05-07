Write-Host "=== TERRAGEST_V2 - SETUP ERP AUTOMATION ENGINE ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/core/automation" | Out-Null

@'
export type AutomationRule = {
  id: string;

  name: string;

  module: string;

  condition: (
    payload: any
  ) => boolean;

  action: (
    payload: any
  ) => Promise<void>;
};

const automationRules:
  AutomationRule[] = [];

export function registerAutomation(
  rule: AutomationRule
) {
  automationRules.push(rule);

  console.log(
    "ERP AUTOMATION REGISTERED",
    rule.name
  );
}

export async function executeAutomations(
  module: string,
  payload: any
) {
  const matchingRules =
    automationRules.filter(
      (rule) =>
        rule.module ===
          module &&
        rule.condition(payload)
    );

  for (const rule of matchingRules) {
    console.log(
      "ERP AUTOMATION EXECUTED",
      rule.name
    );

    await rule.action(
      payload
    );
  }
}

export function getAutomations() {
  return automationRules;
}
'@ | Set-Content "src/core/automation/automation-engine.ts"

Write-Host "=== ERP AUTOMATION ENGINE créé avec succès ===" -ForegroundColor Green