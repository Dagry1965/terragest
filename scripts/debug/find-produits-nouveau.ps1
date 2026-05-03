# =====================================================
# FIND HIDDEN PRODUITS/NOUVEAU REFERENCES
# =====================================================

Write-Host ""
Write-Host "SEARCHING FILE REFERENCES..." `
-ForegroundColor Cyan

Get-ChildItem `
-Path . `
-Recurse `
-Include *.ts,*.tsx `
| Select-String "produits/nouveau"

Write-Host ""
Write-Host "SEARCHING HIDDEN FILES/FOLDERS..." `
-ForegroundColor Cyan

Get-ChildItem `
-Path . `
-Recurse `
-Force `
| Where-Object {

  $_.FullName -like "*produits*nouveau*"
}

Write-Host ""
Write-Host "DONE" `
-ForegroundColor Green