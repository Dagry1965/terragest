import type { WorkflowRuntimeDefinition } from "./WorkflowRuntimeTypes";
import { workflowRuntimeDefinitions } from "./WorkflowRuntimeDefinitions";

export class WorkflowRuntimeRegistry {
  static all(): WorkflowRuntimeDefinition[] {
    return workflowRuntimeDefinitions;
  }

  static forModule(moduleKey: string): WorkflowRuntimeDefinition[] {
    return workflowRuntimeDefinitions.filter(
      (workflow) => workflow.moduleKey === moduleKey
    );
  }

  static get(workflowKey: string): WorkflowRuntimeDefinition | undefined {
    return workflowRuntimeDefinitions.find(
      (workflow) => workflow.key === workflowKey
    );
  }
}