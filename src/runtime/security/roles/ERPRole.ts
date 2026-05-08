export type ERPRoleKey =
  | "super_admin"
  | "admin"
  | "manager"
  | "operator"
  | "viewer";

export type ERPRole = {
  key: ERPRoleKey;
  label: string;
  description?: string;
};