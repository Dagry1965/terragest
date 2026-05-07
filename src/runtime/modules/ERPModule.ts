export interface ERPModule {
  code: string;
  name: string;
  description?: string;
  routes?: string[];
  permissions?: string[];
  workflows?: string[];
  rules?: string[];
  automations?: string[];
  dashboards?: string[];
  notifications?: string[];
  analytics?: string[];
  enabled?: boolean;
}
