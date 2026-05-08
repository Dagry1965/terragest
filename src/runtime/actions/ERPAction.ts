export type ERPActionType =
  | "create"
  | "edit"
  | "details"
  | "delete"
  | "export"
  | "import"
  | "workflow"
  | "audit"
  | "relations"
  | "permissions";

export interface ERPAction {
  key: ERPActionType | string;
  label: string;
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  visible?: boolean;
  disabled?: boolean;
}