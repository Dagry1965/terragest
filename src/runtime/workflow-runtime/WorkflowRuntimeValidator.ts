import type {
  WorkflowRuntimeDefinition,
  WorkflowRuntimeInstance,
  WorkflowRuntimeTransition,
} from "./WorkflowRuntimeTypes";

export class WorkflowRuntimeValidator {
  static findTransition(
    definition: WorkflowRuntimeDefinition,
    instance: WorkflowRuntimeInstance,
    to: string
  ): WorkflowRuntimeTransition | undefined {
    return definition.transitions.find(
      (transition) =>
        transition.from === instance.currentStep &&
        transition.to === to
    );
  }

  static canTransition(
    definition: WorkflowRuntimeDefinition,
    instance: WorkflowRuntimeInstance,
    to: string
  ): boolean {
    return Boolean(
      WorkflowRuntimeValidator.findTransition(
        definition,
        instance,
        to
      )
    );
  }
}