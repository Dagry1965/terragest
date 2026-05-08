export type ERPPermissionAction =
  | "read"
  | "create"
  | "update"
  | "delete"
  | "approve"
  | "export"
  | "import"
  | "audit"
  | "execute"
  | "admin";

export type ERPPermission = {
  key: string;
  module: string;
  action: ERPPermissionAction;
  label: string;
};