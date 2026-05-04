# =========================================================
# TERRAGEST - RUNTIME AUTO REGISTRATION
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " RUNTIME AUTO REGISTRATION"
Write-Host "========================================="
Write-Host ""

# =========================================================
# DIRECTORIES
# =========================================================

$directories = @(

  ".\src\platform\bootstrap"
)

foreach ($directory in $directories) {

  if (!(Test-Path $directory)) {

    New-Item `
      -ItemType Directory `
      -Path $directory `
      | Out-Null

    Write-Host "[CREATED] $directory"

  } else {

    Write-Host "[EXISTS]  $directory"
  }
}

# =========================================================
# DOMAIN RUNTIME LOADER
# =========================================================

$runtimeLoader = @'
// src/platform/bootstrap/loadDomains.ts

export async function loadDomains() {

  console.log(
    "[DOMAIN LOADER] loading domains"
  );

  const domainModules = [

    () =>
      import(
        "@/domains/paiement/rules/registerPaiementRules"
      ),

    () =>
      import(
        "@/domains/paiement/workflows/PaiementWorkflow"
      )
  ];

  for (const load of domainModules) {

    const module =
      await load();

    for (
      const exported of
      Object.values(module)
    ) {

      if (
        typeof exported
        === "function"
      ) {

        try {

          exported();

        } catch (error) {

          console.error(
            "[DOMAIN LOADER ERROR]",
            error
          );
        }
      }
    }
  }

  console.log(
    "[DOMAIN LOADER] completed"
  );
}
'@

Set-Content `
  ".\src\platform\bootstrap\loadDomains.ts" `
  $runtimeLoader

Write-Host ""
Write-Host "[CREATED] loadDomains.ts"

# =========================================================
# UPDATE ERP BOOTSTRAP
# =========================================================

$bootstrapERP = @'
// src/platform/bootstrap/bootstrapERP.ts

import { loadDomains }
from "@/platform/bootstrap/loadDomains";

export async function bootstrapERP() {

  console.log(
    "[BOOTSTRAP ERP]"
  );

  await loadDomains();

  console.log(
    "[BOOTSTRAP ERP READY]"
  );
}
'@

Set-Content `
  ".\src\platform\bootstrap\bootstrapERP.ts" `
  $bootstrapERP

Write-Host "[UPDATED] bootstrapERP.ts"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " AUTO REGISTRATION READY"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\setup-runtime-autoregistration.ps1"
Write-Host "pnpm build"
Write-Host ""