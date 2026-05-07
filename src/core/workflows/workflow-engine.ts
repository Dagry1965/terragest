export type ERPWorkflowExecution = {
  workflow: string;
  module: string;
  status:
    | "pending"
    | "running"
    | "completed"
    | "failed";
};

export async function executeWorkflow(
  workflow: ERPWorkflowExecution
) {
  console.log(
    "ERP WORKFLOW START",
    workflow
  );

  return {
    ...workflow,
    status: "completed",
  };
}
