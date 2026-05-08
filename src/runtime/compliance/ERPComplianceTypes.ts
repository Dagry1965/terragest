export type ERPComplianceSeverity =
  | "info"
  | "warning"
  | "critical";

export type ERPComplianceIssue = {
  moduleKey: string;
  severity: ERPComplianceSeverity;
  code: string;
  message: string;
  recommendation: string;
};

export type ERPComplianceReport = {
  generatedAt: string;
  score: number;
  issues: ERPComplianceIssue[];
};