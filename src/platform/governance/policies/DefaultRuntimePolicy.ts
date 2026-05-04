// src/platform/governance/policies/DefaultRuntimePolicy.ts

import {
  RuntimePolicy
}
from "@/platform/governance/policies/types/RuntimePolicy";

export const DefaultRuntimePolicy:
  RuntimePolicy = {

  name:
    "default-runtime-policy",

  priority:
    1,

  execute(
    context
  ) {

    console.log(
      "[POLICY]",
      context.domain
    );

    return true;
  }
};
