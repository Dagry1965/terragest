export interface ERPGeneratedWorkflow {

  module: string;

  steps: string[];
}

export class ERPWorkflowGenerationEngine {

  generateWorkflow(
    module: string
  ): ERPGeneratedWorkflow {

    return {

      module,

      steps: [
        "created",
        "validated",
        "approved",
        "completed",
      ],
    };
  }
}

export const erpWorkflowGenerationEngine =
  new ERPWorkflowGenerationEngine();