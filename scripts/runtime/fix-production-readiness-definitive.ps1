$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"
Set-Location -LiteralPath $ProjectRoot

function Write-Utf8($Path, $Content) {
  $FullPath = Join-Path $ProjectRoot $Path
  $Dir = Split-Path $FullPath -Parent

  if (!(Test-Path -LiteralPath $Dir)) {
    New-Item -ItemType Directory -Path $Dir -Force | Out-Null
  }

  [System.IO.File]::WriteAllText(
    $FullPath,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host "WRITTEN: $Path" -ForegroundColor Green
}

Write-Utf8 "src\runtime\production\ProductionReadiness.ts" @'
import {
  getERPProductionReadinessSnapshot,
} from "./readiness/ERPProductionReadinessSnapshot";

export const ProductionReadiness = {
  checks() {
    const snapshot =
      getERPProductionReadinessSnapshot();

    return [
      ...snapshot.policies.map((policy) => ({
        key: policy.key,
        label: policy.label,
        status: policy.status,
        description: policy.description,
      })),

      ...snapshot.cloud.map((check) => ({
        key: check.key,
        label: check.label,
        status: check.status,
        description: check.description,
      })),
    ];
  },

  score() {
    return getERPProductionReadinessSnapshot()
      .metrics
      .readinessScore;
  },
};
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

export * from "./ProductionLogger";
export * from "./RuntimeErrorReporter";
export * from "./ProductionReadiness";
'@

# IMPORTANT :
# Si src/runtime/production.ts existe, Next/TS peut résoudre ce fichier avant le dossier production/index.ts.
# On crée donc un fichier proxy propre qui réexporte le dossier.
Write-Utf8 "src\runtime\production.ts" @'
export * from "./production/index";
'@

Write-Host ""
Write-Host "Verification exports :" -ForegroundColor Cyan
Select-String -Path "src\runtime\production\index.ts" -Pattern "ProductionReadiness"
Select-String -Path "src\runtime\production.ts" -Pattern "production/index"

Write-Host ""
Write-Host "Correction definitive appliquee." -ForegroundColor Green
Write-Host "Relance : pnpm build" -ForegroundColor Yellow