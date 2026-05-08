$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"
Set-Location -LiteralPath $ProjectRoot

function Write-Utf8($Path, $Content) {
    $FullPath = Join-Path $ProjectRoot $Path
    $Dir = Split-Path $FullPath -Parent

    if (-not (Test-Path -LiteralPath $Dir)) {
        New-Item -ItemType Directory -Path $Dir -Force | Out-Null
    }

    [System.IO.File]::WriteAllText(
        $FullPath,
        $Content,
        [System.Text.UTF8Encoding]::new($false)
    )

    Write-Host "WRITTEN: $Path" -ForegroundColor Green
}

Write-Utf8 "src\runtime\production\RuntimeErrorReporter.ts" @'
export type RuntimeErrorReport = {
  message: string;
  stack?: string;
  componentStack?: string;
  source?: string;
  timestamp: string;
};

class RuntimeErrorReporterClass {
  private reports: RuntimeErrorReport[] = [];

  report(
    error: unknown,
    info?: { componentStack?: string; source?: string }
  ) {
    const message =
      error instanceof Error
        ? error.message
        : String(error);

    const stack =
      error instanceof Error
        ? error.stack
        : undefined;

    const report: RuntimeErrorReport = {
      message,
      stack,
      componentStack: info?.componentStack,
      source: info?.source ?? "runtime",
      timestamp: new Date().toISOString(),
    };

    this.reports.unshift(report);
    this.reports = this.reports.slice(0, 100);

    return report;
  }

  capture(
    error: unknown,
    source = "runtime"
  ) {
    return this.report(error, { source });
  }

  all() {
    return this.reports;
  }
}

export const RuntimeErrorReporter =
  new RuntimeErrorReporterClass();
'@

$IndexPath = "src\runtime\production\index.ts"

$IndexContent = @'
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

export * from "./RuntimeErrorReporter";
'@

Write-Utf8 $IndexPath $IndexContent

Write-Host ""
Write-Host "RuntimeErrorReporter corrigé avec capture()." -ForegroundColor Green
Write-Host "Relance : pnpm build" -ForegroundColor Yellow
