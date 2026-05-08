import {
  GeneratedRuntimeWorkflows,
} from "../generated/GeneratedRuntimeWorkflows";

export class RuntimeWorkflowRegistry {

  private workflows =
    new Map<
      string,
      string[]
    >();

  initialize() {

    for (
      const [moduleId, workflows]
      of Object.entries(
        GeneratedRuntimeWorkflows
      )
    ) {

      this.workflows.set(
        moduleId,
        workflows
      );
    }
  }

  getModuleWorkflows(
    moduleId: string
  ) {

    return this.workflows.get(
      moduleId
    ) ?? [];
  }

  getAllWorkflows() {

    return Array.from(
      this.workflows.entries()
    );
  }
}

export const runtimeWorkflowRegistry =
  new RuntimeWorkflowRegistry();

runtimeWorkflowRegistry.initialize();