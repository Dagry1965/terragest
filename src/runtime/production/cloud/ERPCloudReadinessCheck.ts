export type ERPCloudReadinessStatus =
  | "ready"
  | "partial"
  | "blocked";

export type ERPCloudReadinessCheck = {
  key: string;
  label: string;
  status: ERPCloudReadinessStatus;
  description: string;
};