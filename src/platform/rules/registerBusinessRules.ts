// src/platform/rules/registerBusinessRules.ts

import { RuleRegistry }
from "@/platform/rules/registry/RuleRegistry";

export function registerBusinessRules() {

  RuleRegistry.register({

    name: "stock-alert-rule",

    domain: "stock",

    action: "create",

    priority: 10,

    async execute(context) {

      console.log(
        "[RULE] stock alert",
        context.payload
      );
    }
  });

  RuleRegistry.register({

    name:
      "paiement-validation-rule",

    domain: "paiement",

    action: "create",

    priority: 20,

    async execute(context) {

      console.log(
        "[RULE] paiement validation",
        context.payload
      );
    }
  });
}