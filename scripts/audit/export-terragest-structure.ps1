# Script corrigé — export-terragest-structure.ps1


$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"
$OutputDir = Join-Path $ProjectRoot "audit-reports"
$Timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$OutputFile = Join-Path $OutputDir "terragest-structure-audit-$Timestamp.md"

Set-Location -LiteralPath $ProjectRoot

if (!(Test-Path -LiteralPath $OutputDir)) {
  New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
}

$ExcludedDirs = @(
  "node_modules",
  ".next",
  ".git",
  "backup",
  "dist",
  "coverage",
  ".turbo",
  ".vercel"
)

$ImportantExtensions = @(
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".json",
  ".md",
  ".ps1",
  ".css",
  ".env",
  ".example"
)

function Is-ExcludedPath {
  param([string]$Path)

  foreach ($dir in $ExcludedDirs) {
    if ($Path -like "*\\$dir\\*" -or $Path -like "*\\$dir") {
      return $true
    }
  }

  return $false
}

function Add-Line {
  param([string]$Text)

  Add-Content -LiteralPath $OutputFile -Value $Text -Encoding UTF8
}

"" | Set-Content -LiteralPath $OutputFile -Encoding UTF8

Add-Line "# TERRAGEST ERP - STRUCTURE AUDIT"
Add-Line ""
Add-Line "**Generated:** $(Get-Date)"
Add-Line "**Project root:** $ProjectRoot"
Add-Line ""

# ------------------------------------------------------------
# 1. GIT STATUS
# ------------------------------------------------------------

Add-Line "## 1. Git Status"
Add-Line '```txt'

git status |
  Out-String |
  ForEach-Object {
    Add-Line $_
  }

Add-Line '```'
Add-Line ""

# ------------------------------------------------------------
# 2. BRANCH
# ------------------------------------------------------------

Add-Line "## 2. Branch"
Add-Line '```txt'

git branch --show-current |
  Out-String |
  ForEach-Object {
    Add-Line $_
  }

Add-Line '```'
Add-Line ""

# ------------------------------------------------------------
# 3. PACKAGE INFO
# ------------------------------------------------------------

Add-Line "## 3. Package Information"
Add-Line '```txt'

if (Test-Path "package.json") {
  Get-Content "package.json" -Raw |
    Add-Content -LiteralPath $OutputFile -Encoding UTF8
}

Add-Line '```'
Add-Line ""

# ------------------------------------------------------------
# 4. FULL DIRECTORY TREE
# ------------------------------------------------------------

Add-Line "## 4. Full Directory Tree"
Add-Line '```txt'

Get-ChildItem -LiteralPath $ProjectRoot -Recurse -Force |
  Where-Object {
    -not (Is-ExcludedPath $_.FullName)
  } |
  ForEach-Object {

    $relative = $_.FullName.Replace($ProjectRoot, "").TrimStart("\\")

    if ($_.PSIsContainer) {
      Add-Line ("[DIR]  {0}" -f $relative)
    }
    else {
      Add-Line ("[FILE] {0}" -f $relative)
    }
  }

Add-Line '```'
Add-Line ""

# ------------------------------------------------------------
# 5. FILE COUNT
# ------------------------------------------------------------

Add-Line "## 5. File Count By Extension"
Add-Line '```txt'

Get-ChildItem -LiteralPath $ProjectRoot -Recurse -File |
  Where-Object {
    -not (Is-ExcludedPath $_.FullName)
  } |
  Group-Object Extension |
  Sort-Object Count -Descending |
  ForEach-Object {
    Add-Line ("{0} : {1}" -f $_.Name, $_.Count)
  }

Add-Line '```'
Add-Line ""

# ------------------------------------------------------------
# 6. RUNTIME ARCHITECTURE
# ------------------------------------------------------------

Add-Line "## 6. Runtime Architecture Files"
Add-Line '```txt'

$RuntimeFolders = @(
  "src\\runtime",
  "src\\components\\erp",
  "src\\app\\(private)",
  "scripts"
)

foreach ($folder in $RuntimeFolders) {

  $full = Join-Path $ProjectRoot $folder

  if (Test-Path -LiteralPath $full) {

    Add-Line ""
    Add-Line ("### {0}" -f $folder)

    Get-ChildItem -LiteralPath $full -Recurse -File |
      Where-Object {
        -not (Is-ExcludedPath $_.FullName)
      } |
      ForEach-Object {

        $relative = $_.FullName.Replace($ProjectRoot, "").TrimStart("\\")

        Add-Line $relative
      }
  }
}

Add-Line '```'
Add-Line ""

# ------------------------------------------------------------
# 7. IMPORTANT SOURCE FILES
# ------------------------------------------------------------

Add-Line "## 7. Important Source File Summaries"
Add-Line ""

$ImportantFiles = Get-ChildItem -LiteralPath $ProjectRoot -Recurse -File |
  Where-Object {
    -not (Is-ExcludedPath $_.FullName) -and
    $ImportantExtensions -contains $_.Extension -and
    $_.Length -lt 200KB
  } |
  Sort-Object FullName

foreach ($file in $ImportantFiles) {

  $relative = $file.FullName.Replace($ProjectRoot, "").TrimStart("\\")

  Add-Line ("### {0}" -f $relative)
  Add-Line ""
  Add-Line '```txt'

  try {

    Get-Content -LiteralPath $file.FullName -TotalCount 120 |
      ForEach-Object {
        Add-Line $_
      }
  }
  catch {
    Add-Line "Unable to read file."
  }

  Add-Line '```'
  Add-Line ""
}

# ------------------------------------------------------------
# 8. RISK INDICATORS
# ------------------------------------------------------------

Add-Line "## 8. Potential Risk Indicators"
Add-Line '```txt'

$Patterns = @(
  "TODO",
  "FIXME",
  "any",
  "as unknown",
  "throw new Error",
  "mock",
  "temporary",
  "legacy",
  "deprecated"
)

foreach ($pattern in $Patterns) {

  Add-Line ""
  Add-Line ("Pattern: {0}" -f $pattern)

  Get-ChildItem -LiteralPath $ProjectRoot -Recurse -File |
    Where-Object {
      -not (Is-ExcludedPath $_.FullName) -and
      $ImportantExtensions -contains $_.Extension
    } |
    Select-String -Pattern $pattern -SimpleMatch -ErrorAction SilentlyContinue |
    Select-Object -First 80 |
    ForEach-Object {

      $rel = $_.Path.Replace($ProjectRoot, "").TrimStart("\\")

     $line = "{0}:{1} {2}" -f $rel, $_.LineNumber, $_.Line.Trim()


      Add-Line $line
    }
}

Add-Line '```'
Add-Line ""

# ------------------------------------------------------------
# 9. BUILD COMMAND
# ------------------------------------------------------------

Add-Line "## 9. Build Command To Re-run"
Add-Line '```powershell'
Add-Line "cd C:\Users\Admin\terragest"
Add-Line "pnpm build"
Add-Line '```'

# ------------------------------------------------------------
# FINAL OUTPUT
# ------------------------------------------------------------

Write-Host ""
Write-Host "AUDIT STRUCTURE EXPORTED:" -ForegroundColor Green
Write-Host $OutputFile -ForegroundColor Yellow
Write-Host ""
````

## Principales corrections

* Correction du bug PowerShell lié à `:` après `$rel`
* Normalisation des concaténations avec `-f`
* Sécurisation des sorties texte
* Amélioration de la lisibilité
* Stabilisation des exports massifs
* Préparation pour l’audit ERP Terragest_V2
* Compatible gros monorepo Next.js / ERP runtime
