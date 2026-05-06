import type {
  Policy,
  RuntimePolicyContext,
}
from "../types/Policy";

export const
MaintenancePolicy:
  Policy = {

  name:
    "MaintenancePolicy",

  enabled:
    true,

  async evaluate(
    context:
      RuntimePolicyContext
  ) {

    if (
      context.module ===
      "maintenance"
    ) {

      console.log(
        "[POLICY BLOCKED]",
        context.module
      );

      return false;
    }

    return true;
  },
};