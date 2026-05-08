$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"
Set-Location -LiteralPath $ProjectRoot

$Path = "src\components\erp\datatable\ERPEnterpriseDataTable.tsx"
$FullPath = Join-Path $ProjectRoot $Path

$Content = Get-Content -LiteralPath $FullPath -Raw

$Content = $Content -replace 'import type \{ ERPAction \} from "@/runtime/actions/ERPAction";\s*', ''

$ImportLine = 'import type { ERPAction } from "@/runtime/actions/ERPAction";'

if ($Content.StartsWith('"use client";')) {
  $Content = $Content -replace '^"use client";', "`"use client`";`r`n`r`n$ImportLine"
}
else {
  $Content = "$ImportLine`r`n$Content"
}

$Content = $Content -replace '\.map\(\(action\) => \(', '.map((action: ERPAction) => ('

[System.IO.File]::WriteAllText(
  $FullPath,
  $Content,
  [System.Text.UTF8Encoding]::new($false)
)

Write-Host "ERPEnterpriseDataTable corrige : import ERPAction force" -ForegroundColor Green