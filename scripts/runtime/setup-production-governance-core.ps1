$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"
Set-Location -LiteralPath $ProjectRoot

function Ensure-Dir($Path) {
  if (!(Test-Path -LiteralPath $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
  }
}

function Write-Utf8($Path, $Content) {
  $FullPath = Join-Path $ProjectRoot $Path
  $Dir = Split-Path $FullPath -Parent
  Ensure-Dir $Dir

  if (Test-Path -LiteralPath $FullPath) {
    $BackupDir = Join-Path $ProjectRoot "backup\production-governance-core"
    Ensure-Dir $BackupDir

    $SafeName = $Path
    $SafeName = $SafeName.Replace("\", "__")
    $SafeName = $SafeName.Replace("/", "__")
    $SafeName = $SafeName.Replace(":", "")

    Copy-Item -LiteralPath $FullPath -Destination (Join-Path $BackupDir "$SafeName.bak") -Force
  }

  [System.IO.File]::WriteAllText(
    $FullPath,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host "WRITTEN: $Path" -ForegroundColor Green
}

Write-Host ""
Write-Host "PRODUCTION GOVERNANCE CORE" -ForegroundColor Cyan
Write-Host ""

Ensure-Dir "src\runtime\production"
Ensure-Dir "src\runtime\production\governance"
Ensure-Dir "src\runtime\production\readiness"
Ensure-Dir "src\runtime\production\quotas"
Ensure-Dir "src\runtime\production\limits"
Ensure-Dir "src\runtime\production\backup"
Ensure-Dir "src\runtime\production\cloud"
Ensure-Dir "src\components\erp\production"

Write-Utf8 "src\runtime\production\governance\ERPProductionPolicy.ts" @'
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
'@

Write-Utf8 "src\runtime\production\governance\ERPProductionPolicyRegistry.ts" @'
import type { ERPProductionPolicy } from "./ERPProductionPolicy";

export const ERPProductionPolicyRegistry: ERPProductionPolicy[] = [
  {
    key: "runtime-registry",
    label: "Runtime Registry",
    level: "required",
    status: "ok",
    description: "Le registre central ERP est disponible.",
  },
  {
    key: "security-rbac",
    label: "Security RBAC",
    level: "required",
    status: "ok",
    description: "La couche roles, permissions et policies existe.",
  },
  {
    key: "tenant-isolation",
    label: "Tenant Isolation",
    level: "required",
    status: "ok",
    description: "Le contexte tenant et l'isolation module sont presents.",
  },
  {
    key: "persistence-driver",
    label: "Persistence Driver",
    level: "required",
    status: "warning",
    description: "Le driver in-memory existe, mais le driver cloud reste a brancher.",
  },
  {
    key: "backup-runtime",
    label: "Backup Runtime",
    level: "recommended",
    status: "warning",
    description: "La strategie backup doit etre connectee a un stockage durable.",
  },
  {
    key: "rate-limits",
    label: "Rate Limits",
    level: "recommended",
    status: "warning",
    description: "Les limites runtime doivent etre appliquees par tenant.",
  },
  {
    key: "monitoring",
    label: "Monitoring Center",
    level: "required",
    status: "ok",
    description: "Le monitoring center est disponible.",
  },
  {
    key: "testing-platform",
    label: "Testing Platform",
    level: "recommended",
    status: "ok",
    description: "La plateforme de validation runtime est disponible.",
  },
];
'@

Write-Utf8 "src\runtime\production\quotas\ERPTenantQuota.ts" @'
export type ERPTenantQuota = {
  tenantId: string;
  maxUsers: number;
  maxModules: number;
  maxStorageGb: number;
  maxWorkflowExecutionsPerDay: number;
  maxQueueJobsPerHour: number;
};
'@

Write-Utf8 "src\runtime\production\quotas\ERPTenantQuotaRegistry.ts" @'
import type { ERPTenantQuota } from "./ERPTenantQuota";

export const ERPTenantQuotaRegistry: ERPTenantQuota[] = [
  {
    tenantId: "tenant_demo",
    maxUsers: 100,
    maxModules: 25,
    maxStorageGb: 500,
    maxWorkflowExecutionsPerDay: 5000,
    maxQueueJobsPerHour: 2000,
  },
  {
    tenantId: "tenant_agricorp",
    maxUsers: 30,
    maxModules: 10,
    maxStorageGb: 100,
    maxWorkflowExecutionsPerDay: 1000,
    maxQueueJobsPerHour: 400,
  },
  {
    tenantId: "tenant_farmgroup",
    maxUsers: 10,
    maxModules: 5,
    maxStorageGb: 20,
    maxWorkflowExecutionsPerDay: 200,
    maxQueueJobsPerHour: 100,
  },
];
'@

Write-Utf8 "src\runtime\production\limits\ERPRateLimit.ts" @'
export type ERPRateLimit = {
  key: string;
  scope: "tenant" | "user" | "module" | "global";
  limit: number;
  window: "minute" | "hour" | "day";
};
'@

Write-Utf8 "src\runtime\production\limits\ERPRateLimitRegistry.ts" @'
import type { ERPRateLimit } from "./ERPRateLimit";

export const ERPRateLimitRegistry: ERPRateLimit[] = [
  {
    key: "api-tenant-minute",
    scope: "tenant",
    limit: 1000,
    window: "minute",
  },
  {
    key: "workflow-tenant-hour",
    scope: "tenant",
    limit: 500,
    window: "hour",
  },
  {
    key: "automation-module-hour",
    scope: "module",
    limit: 300,
    window: "hour",
  },
  {
    key: "stream-global-minute",
    scope: "global",
    limit: 5000,
    window: "minute",
  },
];
'@

Write-Utf8 "src\runtime\production\backup\ERPBackupPlan.ts" @'
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
'@

Write-Utf8 "src\runtime\production\backup\ERPBackupPlanRegistry.ts" @'
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
'@

Write-Utf8 "src\runtime\production\cloud\ERPCloudReadinessCheck.ts" @'
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
'@

Write-Utf8 "src\runtime\production\cloud\ERPCloudReadinessRegistry.ts" @'
import type { ERPCloudReadinessCheck } from "./ERPCloudReadinessCheck";

export const ERPCloudReadinessRegistry: ERPCloudReadinessCheck[] = [
  {
    key: "env-config",
    label: "Environment Config",
    status: "partial",
    description: "Les variables env existent mais doivent etre auditees.",
  },
  {
    key: "firestore",
    label: "Firestore Backend",
    status: "partial",
    description: "Firestore est present mais la persistance runtime doit etre branchee.",
  },
  {
    key: "build",
    label: "Production Build",
    status: "ready",
    description: "Le build Next.js est stable.",
  },
  {
    key: "monitoring",
    label: "Monitoring",
    status: "ready",
    description: "Le monitoring center est en place.",
  },
  {
    key: "backup",
    label: "Backup",
    status: "partial",
    description: "Les plans existent, la cible cloud reste a connecter.",
  },
];
'@

Write-Utf8 "src\runtime\production\readiness\ERPProductionReadinessSnapshot.ts" @'
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
'@

Write-Utf8 "src\runtime\production\index.ts" @'
export * from "./governance/ERPProductionPolicy";
export * from "./governance/ERPProductionPolicyRegistry";

export * from "./quotas/ERPTenantQuota";
export * from "./quotas/ERPTenantQuotaRegistry";

export * from "./limits/ERPRateLimit";
export * from "./limits/ERPRateLimitRegistry";

export * from "./backup/ERPBackupPlan";
export * from "./backup/ERPBackupPlanRegistry";

export * from "./cloud/ERPCloudReadinessCheck";
export * from "./cloud/ERPCloudReadinessRegistry";

export * from "./readiness/ERPProductionReadinessSnapshot";
'@

Write-Utf8 "src\components\erp\production\ERPProductionMetricsGrid.tsx" @'
import { ERPStatCard } from "@/components/erp/ui";
import type { getERPProductionReadinessSnapshot } from "@/runtime/production";

type Snapshot = ReturnType<typeof getERPProductionReadinessSnapshot>;

type Props = {
  snapshot: Snapshot;
};

export function ERPProductionMetricsGrid({ snapshot }: Props) {
  const metrics = snapshot.metrics;

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
      <ERPStatCard label="Readiness" value={`${metrics.readinessScore}%`} helper="Production score" />
      <ERPStatCard label="Policies" value={metrics.policies} helper={`${metrics.okPolicies} OK`} />
      <ERPStatCard label="Quotas" value={metrics.quotas} helper="Tenant limits" />
      <ERPStatCard label="Rate Limits" value={metrics.limits} helper="Runtime limits" />
      <ERPStatCard label="Backups" value={metrics.backups} helper={`${metrics.configuredBackups} configured`} />
      <ERPStatCard label="Cloud Checks" value={metrics.cloudChecks} helper={`${metrics.readyCloud} ready`} />
      <ERPStatCard label="Runtime" value="Governed" helper="SaaS policies" />
      <ERPStatCard label="Status" value="Partial" helper="Cloud readiness" />
    </div>
  );
}
'@

Write-Utf8 "src\components\erp\production\ERPProductionPoliciesPanel.tsx" @'
import { ERPSection } from "@/components/erp/ui";
import type { getERPProductionReadinessSnapshot } from "@/runtime/production";

type Snapshot = ReturnType<typeof getERPProductionReadinessSnapshot>;

type Props = {
  snapshot: Snapshot;
};

export function ERPProductionPoliciesPanel({ snapshot }: Props) {
  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Production Policies
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Gouvernance runtime SaaS.
        </p>
      </div>

      <div className="space-y-4">
        {snapshot.policies.map((policy) => (
          <div
            key={policy.key}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">
                  {policy.label}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {policy.description}
                </p>
              </div>

              <span
                className={[
                  "rounded-full px-3 py-1 text-xs font-semibold",
                  policy.status === "ok"
                    ? "bg-emerald-50 text-emerald-700"
                    : policy.status === "warning"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-red-50 text-red-700",
                ].join(" ")}
              >
                {policy.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ERPSection>
  );
}
'@

Write-Utf8 "src\components\erp\production\ERPProductionCloudPanel.tsx" @'
import { ERPSection } from "@/components/erp/ui";
import type { getERPProductionReadinessSnapshot } from "@/runtime/production";

type Snapshot = ReturnType<typeof getERPProductionReadinessSnapshot>;

type Props = {
  snapshot: Snapshot;
};

export function ERPProductionCloudPanel({ snapshot }: Props) {
  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Cloud Readiness
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Etat de preparation cloud et production.
        </p>
      </div>

      <div className="space-y-4">
        {snapshot.cloud.map((check) => (
          <div
            key={check.key}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">
                  {check.label}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {check.description}
                </p>
              </div>

              <span
                className={[
                  "rounded-full px-3 py-1 text-xs font-semibold",
                  check.status === "ready"
                    ? "bg-emerald-50 text-emerald-700"
                    : check.status === "partial"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-red-50 text-red-700",
                ].join(" ")}
              >
                {check.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ERPSection>
  );
}
'@

Write-Utf8 "src\components\erp\production\ERPProductionQuotasPanel.tsx" @'
import { ERPSection } from "@/components/erp/ui";
import type { getERPProductionReadinessSnapshot } from "@/runtime/production";

type Snapshot = ReturnType<typeof getERPProductionReadinessSnapshot>;

type Props = {
  snapshot: Snapshot;
};

export function ERPProductionQuotasPanel({ snapshot }: Props) {
  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Tenant Quotas
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Limites SaaS par tenant.
        </p>
      </div>

      <div className="space-y-4">
        {snapshot.quotas.map((quota) => (
          <div
            key={quota.tenantId}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <p className="font-semibold text-slate-900">
              {quota.tenantId}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Users: {quota.maxUsers} / Modules: {quota.maxModules} / Storage: {quota.maxStorageGb}GB
            </p>
          </div>
        ))}
      </div>
    </ERPSection>
  );
}
'@

Write-Utf8 "src\components\erp\production\ERPProductionDashboard.tsx" @'
import { ERPPageHeader } from "@/components/erp/ui";
import { getERPProductionReadinessSnapshot } from "@/runtime/production";

import { ERPProductionMetricsGrid } from "./ERPProductionMetricsGrid";
import { ERPProductionPoliciesPanel } from "./ERPProductionPoliciesPanel";
import { ERPProductionCloudPanel } from "./ERPProductionCloudPanel";
import { ERPProductionQuotasPanel } from "./ERPProductionQuotasPanel";

export function ERPProductionDashboard() {
  const snapshot = getERPProductionReadinessSnapshot();

  return (
    <div className="space-y-8">
      <ERPPageHeader
        eyebrow="ERP Production"
        title="Production Governance Core"
        description="Gouvernance SaaS, readiness cloud, quotas tenant, rate limits, backup et policies runtime."
      />

      <ERPProductionMetricsGrid snapshot={snapshot} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ERPProductionPoliciesPanel snapshot={snapshot} />
        <ERPProductionCloudPanel snapshot={snapshot} />
        <ERPProductionQuotasPanel snapshot={snapshot} />
      </div>
    </div>
  );
}
'@

Write-Utf8 "src\components\erp\production\index.ts" @'
export * from "./ERPProductionMetricsGrid";
export * from "./ERPProductionPoliciesPanel";
export * from "./ERPProductionCloudPanel";
export * from "./ERPProductionQuotasPanel";
export * from "./ERPProductionDashboard";
'@

Write-Utf8 "src\app\(private)\production\page.tsx" @'
import { ERPProductionDashboard } from "@/components/erp/production";

export default function Page() {
  return <ERPProductionDashboard />;
}
'@

Write-Host ""
Write-Host "PRODUCTION GOVERNANCE CORE INSTALLE" -ForegroundColor Green
Write-Host "Executer : pnpm build" -ForegroundColor Yellow