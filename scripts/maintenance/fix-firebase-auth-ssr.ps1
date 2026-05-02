# =====================================================
# FIX FIREBASE AUTH NULL SSR
# =====================================================

Write-Host ""
Write-Host "Fixing Firebase auth null checks..." `
-ForegroundColor Cyan

$ROOT =
"C:\Users\Admin\terragest"

Set-Location $ROOT

# =====================================================
# TARGET FILES
# =====================================================

$files =
Get-ChildItem `
  -Path "src" `
  -Recurse `
  -Include *.ts,*.tsx

foreach ($file in $files) {

  $content =
    Get-Content `
      -LiteralPath $file.FullName `
      -Raw

  $original = $content

  # =================================================
  # signInWithEmailAndPassword
  # =================================================

  $content =
    $content -replace `
'return\s+signInWithEmailAndPassword\(',
@'
if (!auth) {

  throw new Error(
    "Firebase auth unavailable"
  );
}

return signInWithEmailAndPassword(
'@

  # =================================================
  # createUserWithEmailAndPassword
  # =================================================

  $content =
    $content -replace `
'return\s+createUserWithEmailAndPassword\(',
@'
if (!auth) {

  throw new Error(
    "Firebase auth unavailable"
  );
}

return createUserWithEmailAndPassword(
'@

  # =================================================
  # signOut
  # =================================================

  $content =
    $content -replace `
'return\s+signOut\(',
@'
if (!auth) {

  throw new Error(
    "Firebase auth unavailable"
  );
}

return signOut(
'@

  # =================================================
  # onAuthStateChanged
  # =================================================

  $content =
    $content -replace `
'return\s+onAuthStateChanged\(',
@'
if (!auth) {

  throw new Error(
    "Firebase auth unavailable"
  );
}

return onAuthStateChanged(
'@

  # =================================================
  # updateProfile
  # =================================================

  $content =
    $content -replace `
'return\s+updateProfile\(',
@'
if (!auth) {

  throw new Error(
    "Firebase auth unavailable"
  );
}

return updateProfile(
'@

  # =================================================
  # SAVE
  # =================================================

  if ($content -ne $original) {

    Set-Content `
      -LiteralPath $file.FullName `
      -Value $content

    Write-Host "Updated:" `
      $file.FullName `
      -ForegroundColor Yellow
  }
}

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Firebase auth SSR fixes applied." `
-ForegroundColor Green

Write-Host ""
Write-Host "Run now:" `
-ForegroundColor Cyan

Write-Host "pnpm build" `
-ForegroundColor White

Write-Host ""