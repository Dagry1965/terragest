Write-Host "=== TERRAGEST_V2 - SETUP ERP RULES ENGINE ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/core/rules" | Out-Null

@'
export type ERPBusinessRule = {
  id: string;

  module: string;

  name: string;

  description?: string;

  enabled: boolean;

  evaluate: (
    data: any
  ) => boolean | Promise<boolean>;

  execute: (
    data: any
  ) => Promise<void>;
};

const rulesRegistry:
  ERPBusinessRule[] = [];

export function registerRule(
  rule: ERPBusinessRule
) {
  rulesRegistry.push(rule);
}

export function getRulesForModule(
  module: string
) {
  return rulesRegistry.filter(
    (rule) =>
      rule.module === module &&
      rule.enabled
  );
}

export async function executeRules(
  module: string,
  data: any
) {
  const rules =
    getRulesForModule(module);

  for (const rule of rules) {
    const matches =
      await rule.evaluate(data);

    if (!matches) {
      continue;
    }

    console.log(
      "ERP RULE MATCHED",
      rule.name
    );

    await rule.execute(data);
  }
}
'@ | Set-Content "src/core/rules/rules-engine.ts"

@'
import {
  registerRule,
} from "@/core/rules/rules-engine";

import {
  pushRuntimeEntry,
} from "@/core/runtime/runtime-timeline";

registerRule({
  id: "materiel-critical-breakdown",

  module: "materiels",

  name:
    "Détection panne critique matériel",

  enabled: true,

  evaluate(data) {
    return (
      data?.etat === "panne"
    );
  },

  async execute(data) {
    console.log(
      "RULE ACTION : maintenance critique"
    );

    pushRuntimeEntry({
      module: "materiels",
      action: "rule",
      type: "workflow",
      status: "warning",
      entityId: data?.id,
      message:
        "Workflow maintenance critique déclenché",
    });
  },
});

registerRule({
  id: "low-stock-alert",

  module: "stocks",

  name:
    "Détection stock faible",

  enabled: true,

  evaluate(data) {
    return (
      typeof data?.quantite === "number" &&
      data.quantite < 10
    );
  },

  async execute(data) {
    console.log(
      "RULE ACTION : stock faible"
    );

    pushRuntimeEntry({
      module: "stocks",
      action: "rule",
      type: "supervision",
      status: "warning",
      entityId: data?.id,
      message:
        "Alerte stock faible détectée",
    });
  },
});

registerRule({
  id: "contract-expiration",

  module: "contrats",

  name:
    "Contrat proche expiration",

  enabled: true,

  evaluate(data) {
    return Boolean(
      data?.expirationProche
    );
  },

  async execute(data) {
    console.log(
      "RULE ACTION : contrat expiration"
    );

    pushRuntimeEntry({
      module: "contrats",
      action: "rule",
      type: "event",
      status: "warning",
      entityId: data?.id,
      message:
        "Contrat proche expiration",
    });
  },
});
'@ | Set-Content "src/core/rules/register-rules.ts"

Write-Host "=== ERP RULES ENGINE créé avec succès ===" -ForegroundColor Green