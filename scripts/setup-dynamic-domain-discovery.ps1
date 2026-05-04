# =========================================================
# TERRAGEST - DYNAMIC DOMAIN DISCOVERY
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " DYNAMIC DOMAIN DISCOVERY"
Write-Host "========================================="
Write-Host ""

# =========================================================
# DOMAIN LOADER
# =========================================================

$loader = @'
// src/platform/bootstrap/loadDomains.ts

export async function loadDomains() {

  console.log(
    "[DOMAIN LOADER] discovering domains"
  );

  const ruleModules =
    import.meta.glob(
      "@/domains/**/rules/register*.ts",
      {
        eager: true
      }
    );

  const workflowModules =
    import.meta.glob(
      "@/domains/**/workflows/*.ts",
      {
        eager: true
      }
    );

  const modules = [

    ...Object.values(
      ruleModules
    ),

    ...Object.values(
      workflowModules
    )
  ];

  for (const module of modules) {

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
            "[DOMAIN LOAD ERROR]",
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
  $loader

Write-Host ""
Write-Host "[UPDATED] loadDomains.ts"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " DYNAMIC DISCOVERY READY"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\setup-dynamic-domain-discovery.ps1"
Write-Host "pnpm build"
Write-Host ""