$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "========================================="
Write-Host " FIXING TERRAGEST NEXT.JS STRUCTURE"
Write-Host "========================================="
Write-Host ""

# -------------------------------------------------
# CREATE SRC DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "src/app",
  "src/lib",
  "src/contexts"
)

foreach ($dir in $dirs) {
  if (!(Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
    Write-Host "Created: $dir"
  }
}

# -------------------------------------------------
# MOVE APP FILES
# -------------------------------------------------

if (Test-Path "app/login") {

  if (!(Test-Path "src/app/login")) {
    Move-Item "app/login" "src/app/"
    Write-Host "Moved: app/login -> src/app/login"
  }
}

if (Test-Path "app/layout.tsx") {

  Move-Item `
    "app/layout.tsx" `
    "src/app/layout.tsx" `
    -Force

  Write-Host "Moved: app/layout.tsx"
}

if (Test-Path "app/globals.css") {

  Move-Item `
    "app/globals.css" `
    "src/app/globals.css" `
    -Force

  Write-Host "Moved: app/globals.css"
}

# -------------------------------------------------
# MOVE LIB
# -------------------------------------------------

if (Test-Path "lib") {

  if (!(Test-Path "src/lib/firebase")) {

    Move-Item `
      "lib/firebase" `
      "src/lib/" `
      -Force

    Write-Host "Moved: lib/firebase"
  }
}

# -------------------------------------------------
# MOVE CONTEXTS
# -------------------------------------------------

if (Test-Path "contexts") {

  if (!(Test-Path "src/contexts/AuthContext.tsx")) {

    Move-Item `
      "contexts/AuthContext.tsx" `
      "src/contexts/" `
      -Force

    Write-Host "Moved: AuthContext.tsx"
  }
}

# -------------------------------------------------
# CLEAN EMPTY ROOT FOLDERS
# -------------------------------------------------

$cleanup = @(
  "app",
  "lib",
  "contexts"
)

foreach ($folder in $cleanup) {

  if (Test-Path $folder) {

    $content = Get-ChildItem $folder -Force

    if ($content.Count -eq 0) {

      Remove-Item $folder -Force

      Write-Host "Removed empty folder: $folder"
    }
  }
}

# -------------------------------------------------
# UPDATE TSCONFIG
# -------------------------------------------------

$tsconfig = "tsconfig.json"

if (Test-Path $tsconfig) {

  $content = Get-Content $tsconfig -Raw

  $content = $content -replace '\./\*', './src/*'

  Set-Content `
    -Path $tsconfig `
    -Value $content `
    -Encoding UTF8

  Write-Host "Updated tsconfig paths"
}

# -------------------------------------------------
# CLEAN .NEXT
# -------------------------------------------------

if (Test-Path ".next") {

  Remove-Item `
    -Recurse `
    -Force `
    ".next"

  Write-Host "Removed .next cache"
}

Write-Host ""
Write-Host "========================================="
Write-Host " STRUCTURE FIX COMPLETE"
Write-Host "========================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. pnpm build"
Write-Host "2. firebase deploy"
Write-Host ""