$ErrorActionPreference = "Stop"

$Root = "C:\Users\Admin\terragest"

$Files =
  Get-ChildItem `
    -LiteralPath "$Root\src" `
    -Recurse `
    -File `
    -Include *.ts,*.tsx `
    -ErrorAction SilentlyContinue

foreach ($File in $Files) {
  $Content = [System.IO.File]::ReadAllText($File.FullName)

  if ($Content.Contains('@/components/erp/forms/ERPFormSection')) {
    $Content = $Content.Replace(
      '@/components/erp/forms/ERPFormSection',
      '@/components/erp/ui'
    )

    [System.IO.File]::WriteAllText(
      $File.FullName,
      $Content,
      [System.Text.Encoding]::UTF8
    )

    Write-Host "UPDATED $($File.FullName)" -ForegroundColor Green
  }
}

Write-Host "Done. Run pnpm build." -ForegroundColor Cyan