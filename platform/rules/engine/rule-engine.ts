import { PolicyEngine } from "../../policies/engine/policy-engine";

const policyEngine =
  new PolicyEngine();

export class RuleEngine {

  evaluate(rule: string) {

    console.log(
      "[RULE]",
      rule
    );

    policyEngine.evaluate(
      rule
    );
  }
}