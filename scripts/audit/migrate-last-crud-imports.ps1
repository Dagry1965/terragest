$ErrorActionPreference = "Stop"

$Root = "C:\Users\Admin\terragest"

$Files = @(
  "$Root\src\features\produits\components\ProductEditForm.tsx",
  "$Root\src\features\produits\components\ProductForm.tsx",
  "$Root\src\features\produits\components\ProductsTable.tsx"
)

foreach ($File in $Files) {
  if (-not (Test-Path $File)) {
    Write-Host "MISSING $File" -ForegroundColor Yellow
    continue
  }

  $Content = [System.IO.File]::ReadAllText($File)

  $Content = $Content.Replace(
    'from "@/components/crud/EntityForm";',
    'from "@/components/erp/ui";'
  )

  $Content = $Content.Replace(
    'from "@/components/crud/ConfirmDialog";',
    'from "@/components/erp/ui";'
  )

  $Content = $Content.Replace(
    'from "@/components/crud/DataTable";',
    'from "@/components/erp/ui";'
  )

  $Content = $Content.Replace(
    'from "@/components/crud/SearchBar";',
    'from "@/components/erp/ui";'
  )

  $Content = $Content.Replace(
    'from "@/components/crud/EmptyState";',
    'from "@/components/erp/ui";'
  )

  [System.IO.File]::WriteAllText(
    $File,
    $Content,
    [System.Text.Encoding]::UTF8
  )

  Write-Host "UPDATED $File" -ForegroundColor Green
}

Write-Host ""
Write-Host "Done. Run pnpm build." -ForegroundColor Cyan