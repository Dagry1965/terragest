# =====================================================
# ADD TOAST IMPORT
# =====================================================

Write-Host ""
Write-Host "Adding toast import..." `
-ForegroundColor Cyan

$ROOT =
"C:\Users\Admin\terragest"

Set-Location $ROOT

$file =
"src\app\(private)\produits\[id]\edit\page.tsx"

$content =
Get-Content `
  -LiteralPath $file `
  -Raw

if ($content -notmatch
'react-hot-toast') {

  $content =
'import toast from "react-hot-toast";

' + $content

  Set-Content `
    -LiteralPath $file `
    -Value $content

  Write-Host "toast import added." `
  -ForegroundColor Green
}

Write-Host ""
Write-Host "Run now:" `
-ForegroundColor Cyan

Write-Host "pnpm build"