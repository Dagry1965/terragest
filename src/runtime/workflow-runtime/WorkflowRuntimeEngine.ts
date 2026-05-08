import { WorkflowRuntimeRegistry } from "./WorkflowRuntimeRegistry";
import { WorkflowRuntimeStore } from "./WorkflowRuntimeStore";
import { WorkflowRuntimeValidator } from "./WorkflowRuntimeValidator";
import { WorkflowRuntimeAudit } from "./WorkflowRuntimeAudit";

export class WorkflowRuntimeEngine {
  static start(workflowKey: string, recordId: string) {
    const definition = WorkflowRuntimeRegistry.get(workflowKey);

    if (!definition) {
      throw new Error(`Workflow introuvable: ${workflowKey}`);
    }

    const instance = WorkflowRuntimeStore.create(definition, recordId);

    WorkflowRuntimeAudit.log(instance, "Workflow demarre");

    return instance;
  }

  static transition(
    workflowKey: string,
    recordId: string,
    to: string
  ) {
    const definition = WorkflowRuntimeRegistry.get(workflowKey);

    if (!definition) {
      throw new Error(`Workflow introuvable: ${workflowKey}`);
    }

    const instance = WorkflowRuntimeStore.create(definition, recordId);

    const transition =
      WorkflowRuntimeValidator.findTransition(
        definition,
        instance,
        to
      );

    if (!transition) {
      throw new Error(
        `Transition invalide: ${instance.currentStep} -> ${to}`
      );
    }

    const previous = instance.currentStep;

    instance.currentStep = to;

    instance.history.unshift({
      id: `${instance.id}-${Date.now()}`,
      from: previous,
      to,
      label: transition.label,
      date: new Date().toISOString(),
    });

    const completed =
      definition.transitions.filter((item) => item.from === to).length === 0;

    if (completed) {
      instance.status = "completed";
    }

    WorkflowRuntimeStore.save(instance);
    WorkflowRuntimeAudit.log(instance, transition.label);

    return instance;
  }
}