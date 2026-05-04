import { RuleEngine } from "../../rules/engine/rule-engine";
import { Workflow } from "../types";

export class WorkflowEngine {

  private workflows: Workflow[] = [];

  register(workflow: Workflow) {

    this.workflows.push(workflow);

    console.log(
      "[WORKFLOW REGISTERED]",
      workflow.name
    );
  }

  execute(trigger: string) {

    const matchingWorkflows =
      this.workflows.filter(

        workflow =>
          workflow.trigger === trigger
      );

    if (matchingWorkflows.length === 0) {

      console.log(
        "[WORKFLOW]",
        "No workflow found for trigger:",
        trigger
      );

      return;
    }

    for (const workflow of matchingWorkflows) {

      console.log(
        "[WORKFLOW EXECUTION]",
        workflow.name
      );
    }
  }

  list() {

    return this.workflows;
  }
}