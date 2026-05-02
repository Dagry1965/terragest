export interface WorkflowExecution {

  id: string;

  workflowId: string;

  statut: string;

  contexte?: any;

  startedAt: string;

  completedAt?: string;
}
