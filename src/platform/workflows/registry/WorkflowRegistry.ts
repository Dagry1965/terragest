// src/platform/workflows/registry/WorkflowRegistry.ts

import {
  StateTransition
}
from "@/platform/workflows/states/StateTransition";

class WorkflowRegistryManager {

  private transitions:
    Record<string, StateTransition[]>
    = {};

  register(

    domain: string,

    transitions:
      StateTransition[]
  ) {

    this.transitions[
      domain
    ] = transitions;

    console.log(
      "[WORKFLOW REGISTERED]",
      domain
    );
  }

  getTransitions(
    domain: string
  ) {

    return (
      this.transitions[
        domain
      ] || []
    );
  }
}

export const WorkflowRegistry =
  new WorkflowRegistryManager();
