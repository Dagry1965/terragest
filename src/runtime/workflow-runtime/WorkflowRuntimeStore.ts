import type {
  WorkflowRuntimeDefinition,
  WorkflowRuntimeInstance,
} from "./WorkflowRuntimeTypes";

const instances = new Map<string, WorkflowRuntimeInstance>();

export class WorkflowRuntimeStore {
  static create(
    definition: WorkflowRuntimeDefinition,
    recordId: string
  ): WorkflowRuntimeInstance {
    const id = `${definition.key}-${recordId}`;

    const existing = instances.get(id);

    if (existing) {
      return existing;
    }

    const instance: WorkflowRuntimeInstance = {
      id,
      moduleKey: definition.moduleKey,
      workflowKey: definition.key,
      recordId,
      currentStep: definition.initialStep,
      status: "active",
      history: [
        {
          id: `${id}-start`,
          to: definition.initialStep,
          label: "Workflow initialise",
          date: new Date().toISOString(),
        },
      ],
    };

    instances.set(id, instance);

    return instance;
  }

  static get(id: string): WorkflowRuntimeInstance | undefined {
    return instances.get(id);
  }

  static save(instance: WorkflowRuntimeInstance) {
    instances.set(instance.id, instance);
    return instance;
  }
}