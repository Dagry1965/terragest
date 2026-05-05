export interface WorkflowDefinition {

  id: string;

  nom: string;

  description?: string;

  actif: boolean;

  triggers: string[];

  steps: WorkflowStep[];

  createdAt: string;
}

export interface WorkflowStep {

  id: string;

  nom: string;

  type: string;

  action: string;

  suivant?: string;
}
