import {
  maintenanceWorkflow,
}
from "@/runtime/workflow-ui/maintenance.workflow";

import {
  RuntimePermissionsEngine,
}
from "@/runtime/permissions/RuntimePermissionsEngine";

import {
  RuntimeStateEngine,
}
from "@/runtime/state/RuntimeStateEngine";

const registry = {

  maintenance:
    maintenanceWorkflow,
};

export class WorkflowRuntimeEngine {

  static getWorkflow(
    module: string
  ) {

    return registry[
      module as keyof typeof registry
    ];
  }

  static getAvailableActions(

    module: string,

    currentState: string,

    role?: string,

  ) {

    const workflow =
      this.getWorkflow(
        module
      );

    if (!workflow) {
      return [];
    }

    return workflow.transitions.filter(

      (transition) => {

        const validState =
          RuntimeStateEngine
            .isFinal(
              module,
              currentState
            ) === false;

        const allowed =
          RuntimePermissionsEngine.can(
            role || "",
            module,
            transition.action
          );

        return (
          transition.from === currentState &&
          validState &&
          allowed
        );
      }
    );
  }
}