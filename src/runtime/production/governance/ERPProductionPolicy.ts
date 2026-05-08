export type ERPProductionPolicyLevel =
  | "required"
  | "recommended"
  | "optional";

export type ERPProductionPolicyStatus =
  | "ok"
  | "warning"
  | "missing";

export type ERPProductionPolicy = {
  key: string;
  label: string;
  level: ERPProductionPolicyLevel;
  status: ERPProductionPolicyStatus;
  description: string;
};