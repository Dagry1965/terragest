export interface ERPUserProfile {

  id: string;

  email: string;

  displayName?: string;

  role: string;

  tenant: string;

  permissions: string[];

  workspaces: string[];

  modules: string[];
}