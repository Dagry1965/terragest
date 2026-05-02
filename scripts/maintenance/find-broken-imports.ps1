Write-Host ""
Write-Host "Scanning broken imports..." -ForegroundColor Cyan
Write-Host ""

# =====================================================
# ROOT
# =====================================================

$ROOT =
"C:\Users\Admin\terragest"

Set-Location $ROOT

# =====================================================
# FILES
# =====================================================

$files =
Get-ChildItem `
  -Path "src" `
  -Recurse `
  -File `
  -Include *.ts,*.tsx

# =====================================================
# SCAN
# =====================================================

foreach ($file in $files) {

  try {

    $content =
      Get-Content `
        -LiteralPath $file.FullName `
        -ErrorAction Stop

    foreach ($line in $content) {

      if (
        $line -match 'from\s+["''](@\/[^"'']+)["'']'
      ) {

        $importPath =
          $matches[1]

        $relativePath =
          $importPath `
            -replace '^@\/', 'src/'

        $possiblePaths = @(

          "$ROOT\$relativePath.ts",

          "$ROOT\$relativePath.tsx",

          "$ROOT\$relativePath\index.ts",

          "$ROOT\$relativePath\index.tsx"
        )

        $exists = $false

        foreach ($path in $possiblePaths) {

          if (
            Test-Path `
              -LiteralPath $path
          ) {

            $exists = $true
            break
          }
        }

        if (-not $exists) {

          Write-Host ""
          Write-Host "BROKEN IMPORT" `
            -ForegroundColor Red

          Write-Host "File :" `
            $file.FullName

          Write-Host "Import :" `
            $importPath
        }
      }
    }

  } catch {

    Write-Host ""
    Write-Host "SKIPPED :" `
      $file.FullName `
      -ForegroundColor Yellow
  }
}

Write-Host ""
Write-Host "Scan completed." `
  -ForegroundColor Green
Write-Host ""