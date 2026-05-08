import {
  WorkflowPersistenceEngine,
}
from "@/runtime/workflow-persistence/WorkflowPersistenceEngine";

export class WorkflowRuntimeService {

  static async executeTransition({

    module,

    entityId,

    fromState,

    toState,

    action,

    user,

    comment,

  }: any) {

    console.log(
      "Workflow Transition",
      {
        module,
        entityId,
        fromState,
        toState,
        action,
      }
    );

    await WorkflowPersistenceEngine
      .persistTransition({

        module,

        entityId,

        fromState,

        toState,

        action,

        user,

        comment,
      });
  }
}
