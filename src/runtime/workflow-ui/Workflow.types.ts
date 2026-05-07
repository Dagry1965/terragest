export interface WorkflowState {

  id: string;

  label: string;

  color?: string;

  final?: boolean;
}

export interface WorkflowTransition {

  from: string;

  to: string;

  action: string;

  roles?: string[];
}
