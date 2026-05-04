import { Rule } from "../types";

import { ruleRegistry } from "../registry";

import { PolicyEngine } from "../../policies/engine/policy-engine";

import { traceExecution } from "../../execution/runtime/execution-trace";

const policyEngine =
  new PolicyEngine();

export class RuleEngine {

  private rules: Rule[] =
    ruleRegistry;

  evaluate(trigger: string) {

    const matchingRules =
      this.rules.filter(

        rule =>
          rule.condition === trigger
      );

    if (matchingRules.length === 0) {

      console.log(
        "[RULE]",
        "No rule found for trigger:",
        trigger
      );

      return;
    }

    for (const rule of matchingRules) {

      try {

        traceExecution(
          "RULE",
          rule.name
        );

        console.log(
          "[RULE]",
          rule.name
        );

        policyEngine.evaluate(
          rule.name
        );

      } catch (error) {

        console.error(
          "[RULE ERROR]",
          error
        );
      }
    }
  }

  list() {

    return this.rules;
  }
}