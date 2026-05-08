import type { ERPBackupPlan } from "./ERPBackupPlan";

export const ERPBackupPlanRegistry: ERPBackupPlan[] = [
  {
    key: "firestore-runtime-backup",
    label: "Firestore Runtime Backup",
    target: "runtime collections",
    frequency: "daily",
    status: "pending",
  },
  {
    key: "tenant-config-backup",
    label: "Tenant Config Backup",
    target: "tenant registry",
    frequency: "daily",
    status: "configured",
  },
  {
    key: "audit-log-backup",
    label: "Audit Log Backup",
    target: "security and business audit",
    frequency: "hourly",
    status: "pending",
  },
];