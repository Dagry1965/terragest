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

Write-Utf8 "src\components\erp\production\ProductionHardeningPanel.tsx" @'
import {
  ERPSection,
  ERPStatCard,
} from "@/components/erp/ui";

import {
  getERPProductionReadinessSnapshot,
} from "@/runtime/production";

export function ProductionHardeningPanel() {
  const snapshot =
    getERPProductionReadinessSnapshot();

  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Production Hardening
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Gouvernance production, readiness cloud, quotas, backups et limites runtime.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        <ERPStatCard
          label="Readiness"
          value={`${snapshot.metrics.readinessScore}%`}
          helper="Score production"
        />

        <ERPStatCard
          label="Policies"
          value={snapshot.metrics.policies}
          helper={`${snapshot.metrics.okPolicies} OK`}
        />

        <ERPStatCard
          label="Cloud"
          value={snapshot.metrics.cloudChecks}
          helper={`${snapshot.metrics.readyCloud} ready`}
        />

        <ERPStatCard
          label="Backups"
          value={snapshot.metrics.backups}
          helper={`${snapshot.metrics.configuredBackups} configured`}
        />
      </div>
    </ERPSection>
  );
}
'@

$IndexPath = "src\components\erp\production\index.ts"
$FullIndexPath = Join-Path $ProjectRoot $IndexPath

$IndexContent = Get-Content -LiteralPath $FullIndexPath -Raw

$ExportLine = 'export * from "./ProductionHardeningPanel";'

if ($IndexContent -notmatch [regex]::Escape($ExportLine)) {
  $IndexContent = $IndexContent.TrimEnd() + "`r`n" + $ExportLine + "`r`n"
}

Write-Utf8 $IndexPath $IndexContent

Write-Host ""
Write-Host "ProductionHardeningPanel ajoute et exporte." -ForegroundColor Green
Write-Host "Relance : pnpm build" -ForegroundColor Yellow