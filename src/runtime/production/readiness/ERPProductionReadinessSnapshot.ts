import { ERPProductionPolicyRegistry } from "../governance/ERPProductionPolicyRegistry";
import { ERPTenantQuotaRegistry } from "../quotas/ERPTenantQuotaRegistry";
import { ERPRateLimitRegistry } from "../limits/ERPRateLimitRegistry";
import { ERPBackupPlanRegistry } from "../backup/ERPBackupPlanRegistry";
import { ERPCloudReadinessRegistry } from "../cloud/ERPCloudReadinessRegistry";

export function getERPProductionReadinessSnapshot() {
  const policies = ERPProductionPolicyRegistry;
  const quotas = ERPTenantQuotaRegistry;
  const limits = ERPRateLimitRegistry;
  const backups = ERPBackupPlanRegistry;
  const cloud = ERPCloudReadinessRegistry;

  const okPolicies =
    policies.filter((policy) => policy.status === "ok").length;

  const readyCloud =
    cloud.filter((check) => check.status === "ready").length;

  const configuredBackups =
    backups.filter((backup) => backup.status === "configured").length;

  return {
    policies,
    quotas,
    limits,
    backups,
    cloud,
    metrics: {
      policies: policies.length,
      okPolicies,
      quotas: quotas.length,
      limits: limits.length,
      backups: backups.length,
      configuredBackups,
      cloudChecks: cloud.length,
      readyCloud,
      readinessScore: Math.round(
        ((okPolicies + readyCloud + configuredBackups) /
          (policies.length + cloud.length + backups.length)) *
          100
      ),
    },
  };
}