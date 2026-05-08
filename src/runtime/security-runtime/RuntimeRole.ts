export type RuntimeRole =
  | "admin"
  | "supervisor"
  | "operator"
  | "viewer";

export interface RuntimeUser {
  id: string;
  name: string;
  role: RuntimeRole;
}