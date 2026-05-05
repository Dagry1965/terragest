export const WorkflowEngine = {

  async execute(
    workflow: any,
    contexte: any
  ) {

    console.log(
      "Executing workflow",
      workflow.nom
    );

    const logs: any[] = [];

    for (
      const step
      of workflow.steps
    ) {

      logs.push({

        step:
          step.nom,

        status:
          "COMPLETED",
      });

      console.log(
        "Workflow step",
        step.nom
      );
    }

    return {

      success: true,

      logs,
    };
  },
};
