export interface DynamicSelectOption {

  label: string;

  value: string;

  disabled?: boolean;

  metadata?: any;
}

export interface DynamicSelectContext {

  module?: string;

  exploitationId?: string;

  terrainId?: string;

  materielId?: string;

  interventionId?: string;

  criticite?: string;

  role?: string;
}
