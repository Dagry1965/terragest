$ErrorActionPreference = "Stop"

$Root = "C:\Users\Admin\terragest"

function Replace-InFile(
  $Path,
  $Search,
  $Replace
) {

  if (-not (Test-Path $Path)) {
    return
  }

  $Content =
    [System.IO.File]::ReadAllText($Path)

  if ($Content.Contains($Search)) {

    $Content =
      $Content.Replace(
        $Search,
        $Replace
      )

    [System.IO.File]::WriteAllText(
      $Path,
      $Content,
      [System.Text.Encoding]::UTF8
    )

    Write-Host "UPDATED $Path" `
      -ForegroundColor Green
  }
}

$Files =
  Get-ChildItem `
    "$Root\src" `
    -Recurse `
    -Include *.ts,*.tsx

foreach ($File in $Files) {

  $Path = $File.FullName

  # =====================================================
  # CRUD -> ERP UI
  # =====================================================

  Replace-InFile `
    $Path `
    '@/components/crud/DataTable' `
    '@/components/erp/ui'

  Replace-InFile `
    $Path `
    '@/components/crud/EmptyState' `
    '@/components/erp/ui'

  Replace-InFile `
    $Path `
    '@/components/crud/PageHeader' `
    '@/components/erp/ui'

  Replace-InFile `
    $Path `
    '@/components/crud/SearchBar' `
    '@/components/erp/ui'

  # =====================================================
  # UI LEGACY -> ERP UI
  # =====================================================

  Replace-InFile `
    $Path `
    '@/components/ui/Button' `
    '@/components/erp/ui'

  Replace-InFile `
    $Path `
    '@/components/ui/Card' `
    '@/components/erp/ui'

  Replace-InFile `
    $Path `
    '@/components/ui/Input' `
    '@/components/erp/ui'

  Replace-InFile `
    $Path `
    '@/components/ui/Table' `
    '@/components/erp/ui'

  Replace-InFile `
    $Path `
    '@/components/ui/EmptyState' `
    '@/components/erp/ui'

  # =====================================================
  # PAGE WRAPPERS
  # =====================================================

  Replace-InFile `
    $Path `
    '@/components/erp/page' `
    '@/components/erp/ui'

  # =====================================================
  # THEME WRAPPERS
  # =====================================================

  Replace-InFile `
    $Path `
    '@/components/erp/theme' `
    '@/components/erp/ui'
}

Write-Host ""
Write-Host "===================================" `
  -ForegroundColor Cyan

Write-Host "UI IMPORT MIGRATION COMPLETE" `
  -ForegroundColor Green

Write-Host "===================================" `
  -ForegroundColor Cyan