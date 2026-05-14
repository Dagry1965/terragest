export type ERPWorkspaceKey =
  | "general"
  | "production"
  | "maintenance"
  | "finance"
  | "administration"
  | "supervision";

export type ERPWorkspaceModule = {
  key: string;
  label: string;
  description?: string;
};

export type ERPWorkspaceKpi = {
  key: string;
  label: string;
  value?: string;
  module?: string;
};

export type ERPWorkspaceQuickAction = {
  key: string;
  label: string;
  href: string;
};

export type ERPWorkspace = {
  key: ERPWorkspaceKey;
  label: string;
  description: string;
  defaultHref: string;
  modules: ERPWorkspaceModule[];
  kpis: ERPWorkspaceKpi[];
  quickActions: ERPWorkspaceQuickAction[];
};