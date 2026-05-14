import type {
  ERPModuleWorkflow,
  ERPWorkflowTransition,
} from "@/runtime/modules/ERPModule";

export class RuntimeWorkflowEngine {

  static getAvailableTransitions(
    workflow: ERPModuleWorkflow,
    currentState: string
  ): ERPWorkflowTransition[] {

    return (
      workflow.transitions?.filter(
        (transition) =>
          transition.from === currentState
      ) ?? []
    );
  }

  static canExecuteTransition(
    workflow: ERPModuleWorkflow,
    currentState: string,
    action: string
  ) {

    return (
      workflow.transitions?.some(
        (transition) =>
          transition.from === currentState &&
          transition.action === action
      ) ?? false
    );
  }

  static executeTransition(
    workflow: ERPModuleWorkflow,
    currentState: string,
    action: string
  ) {

    const transition =
      workflow.transitions?.find(
        (transition) =>
          transition.from === currentState &&
          transition.action === action
      );

    if (!transition) {
      return {
        success: false,
        error: "Transition impossible",
      };
    }

    return {
      success: true,
      from: transition.from,
      to: transition.to,
      action: transition.action,
    };
  }
}