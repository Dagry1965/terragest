export type ERPRuntimePermission = {
  key: string;
};

export interface ERPSessionUser {
  id: string;
  email: string;
  displayName?: string;
}

export interface ERPSessionContext {
  user: ERPSessionUser | null;

  role: string;

  tenant: string;

  permissions:
    ERPRuntimePermission[];

  workspaces:
    string[];

  modules:
    string[];
}