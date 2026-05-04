// src/platform/workflows/runtime/WorkflowRuntime.ts

import { WorkflowState }
from "@/platform/workflows/states/WorkflowState";

import { WorkflowRegistry }
from "@/platform/workflows/registry/WorkflowRegistry";

export class WorkflowRuntime {

  static canTransition(

    domain: string,

    from: WorkflowState,

    to: WorkflowState
  ) {

    const transitions =
      WorkflowRegistry
        .getTransitions(
          domain
        );

    return transitions.some(
      transition =>

        transition.from === from
        &&

        transition.to === to
    );
  }
}
