$maintenancePage = "C:\Users\Admin\terragest\src\app\(private)\maintenance\page.tsx"

$content = [System.IO.File]::ReadAllText($maintenancePage)

$content = $content -replace 'onAction=\{\s*\(\s*action\s*,\s*targetState\s*\)\s*=>\s*\{', 'onAction={async (action, targetState) => {'

[System.IO.File]::WriteAllText(
  $maintenancePage,
  $content,
  [System.Text.Encoding]::UTF8
)

Write-Host "Correction async onAction appliquée."
