$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "===================================="
Write-Host " FIXING IMPORTS"
Write-Host "===================================="
Write-Host ""

$files = Get-ChildItem `
  -Recurse `
  -Include *.ts,*.tsx `
  -Path src

foreach ($file in $files) {

  $content = [System.IO.File]::ReadAllText($file.FullName)

  # Fix firebase import
  $content = $content.Replace(
    "@/lib/firebase/firebase",
    "@/lib/firebase/config"
  )

  # Fix wrong src alias
  $content = $content.Replace(
    "@/src/contexts/AuthContext",
    "@/contexts/AuthContext"
  )

  [System.IO.File]::WriteAllText(
  $file.FullName,
  $content
)
}

Write-Host ""
Write-Host "===================================="
Write-Host " IMPORT FIX COMPLETE"
Write-Host "===================================="