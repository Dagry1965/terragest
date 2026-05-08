$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"
Set-Location -LiteralPath $ProjectRoot

$Path = "src\runtime\testing\simulation\ERPRuntimeSimulation.ts"
$FullPath = Join-Path $ProjectRoot $Path

$Content = @'
import {
  ERPWorkerEngine,
} from "@/runtime/workers";

import {
  ERPAccessGuard,
} from "@/runtime/security";

import {
  ERPAutomationRegistry,
} from "@/runtime/automation";

export const ERPRuntimeSimulation = {
  simulateWorkflow() {
    return {
      status: "success",
      duration: 250,
    };
  },

  simulateWorker() {
    return ERPWorkerEngine.executeJob(
      "worker_runtime_1",
      "materiels",
      "SIMULATION_JOB"
    );
  },

  simulateSecurity() {
    return ERPAccessGuard.can(
      "materiels",
      "read"
    );
  },

  simulateAutomation() {
    return ERPAutomationRegistry;
  },
};
'@

[System.IO.File]::WriteAllText(
  $FullPath,
  $Content,
  [System.Text.UTF8Encoding]::new($false)
)

Write-Host "ERPRuntimeSimulation corrige." -ForegroundColor Green
Write-Host "Relance : pnpm build" -ForegroundColor Yellow