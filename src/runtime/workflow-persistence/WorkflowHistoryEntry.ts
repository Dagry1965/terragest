export interface WorkflowHistoryEntry {

  module: string;

  entityId: string;

  fromState: string;

  toState: string;

  action: string;

  user?: string;

  comment?: string;

  createdAt?: any;
}
