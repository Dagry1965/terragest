export type ERPBackupPlanStatus =
  | "configured"
  | "pending"
  | "missing";

export type ERPBackupPlan = {
  key: string;
  label: string;
  target: string;
  frequency: string;
  status: ERPBackupPlanStatus;
};