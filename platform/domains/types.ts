export interface DomainDefinition {
  key: string;

  label: string;

  enabled: boolean;

  realtime?: boolean;

  offline?: boolean;

  analytics?: boolean;

  monitoring?: boolean;
}