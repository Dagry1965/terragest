Write-Host "=== TERRAGEST_V2 - SETUP ERP RUNTIME BOOTSTRAP ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/core/bootstrap" | Out-Null

@'
import {
  startWorkerLoop,
} from "@/core/worker-loop/worker-loop";

let runtimeStarted =
  false;

export async function bootstrapERP() {
  if (runtimeStarted) {
    return;
  }

  runtimeStarted = true;

  console.log(
    "ERP RUNTIME BOOTSTRAP STARTED"
  );

  await startWorkerLoop();

  console.log(
    "ERP RUNTIME ACTIVE"
  );
}
'@ | Set-Content "src/core/bootstrap/runtime-bootstrap.ts"

Write-Host "=== ERP RUNTIME BOOTSTRAP créé avec succès ===" -ForegroundColor Green