export type ERPUserRole =
  | "ADMIN"
  | "MANAGER"
  | "MAINTENANCE"
  | "FINANCE"
  | "OPERATOR"
  | "VIEWER";

export type RoleDefinition = {
  role: ERPUserRole;
  allowedCapabilities: string[];
  allowedFeatures?: string[];
};