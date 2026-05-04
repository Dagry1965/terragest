import { Policy } from "../types";

import { policyRegistry } from "../registry";

import { RuntimeExecutor } from "../../execution/executors/runtime-executor";

import { traceExecution } from "../../execution/runtime/execution-trace";

const runtimeExecutor =
  new RuntimeExecutor();

export class PolicyEngine {

  private policies: Policy[] =
    policyRegistry;

  evaluate(trigger: string) {

    const matchingPolicies =
      this.policies.filter(

        policy =>
          policy.enabled
      );

    if (matchingPolicies.length === 0) {

      console.log(
        "[POLICY]",
        "No policy found for trigger:",
        trigger
      );

      return;
    }

    for (const policy of matchingPolicies) {

      try {

        traceExecution(
          "POLICY",
          policy.name
        );

        console.log(
          "[POLICY]",
          policy.name
        );

        runtimeExecutor.execute(
          policy.name
        );

      } catch (error) {

        console.error(
          "[POLICY ERROR]",
          error
        );
      }
    }
  }

  list() {

    return this.policies;
  }
}