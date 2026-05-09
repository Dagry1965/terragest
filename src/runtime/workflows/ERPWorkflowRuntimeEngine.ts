export interface ERPWorkflowState {

  module: string;

  states: string[];
}

export class ERPWorkflowRuntimeEngine {

  private workflows:
    ERPWorkflowState[] = [];

  registerWorkflow(
    workflow: ERPWorkflowState
  ) {

    this.workflows.push(
      workflow
    );
  }

  getWorkflow(
    module: string
  ) {

    return this.workflows.find(
      workflow =>
        workflow.module === module
    );
  }

  canTransition(
    module: string,
    from: string,
    to: string
  ) {

    const workflow =
      this.getWorkflow(module);

    if (!workflow) {

      return false;
    }

    return (
      workflow.states.includes(from)
      && workflow.states.includes(to)
    );
  }
}

export const erpWorkflowRuntimeEngine =
  new ERPWorkflowRuntimeEngine();