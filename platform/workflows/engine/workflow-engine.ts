import { Workflow } from "../types";

import { workflowRegistry } from "../registry";

import { RuleEngine } from "../../rules/engine/rule-engine";

import { traceExecution } from "../../execution/runtime/execution-trace";

const ruleEngine =
  new RuleEngine();

export class WorkflowEngine {

  private workflows: Workflow[] =
    workflowRegistry;

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

      try {

        traceExecution(
          "WORKFLOW",
          workflow.name
        );

        console.log(
          "[WORKFLOW EXECUTION]",
          workflow.name
        );

        ruleEngine.evaluate(
          workflow.name
        );

      } catch (error) {

        console.error(
          "[WORKFLOW ERROR]",
          error
        );
      }
    }
  }

  list() {

    return this.workflows;
  }
}