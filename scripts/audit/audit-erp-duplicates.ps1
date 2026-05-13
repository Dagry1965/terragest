$ErrorActionPreference = "Stop"

$Root = "C:\Users\Admin\terragest"
$Report = "$Root\docs\audit\TERRAGEST_DUPLICATES_AUDIT.md"

function Ensure-Dir($Path) {
  if (-not (Test-Path $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
  }
}

function Add-Line($Text = "") {
  [System.IO.File]::AppendAllText(
    $Report,
    "$Text`r`n",
    [System.Text.Encoding]::UTF8
  )
}

function Section($Title) {
  Add-Line ""
  Add-Line "# $Title"
  Add-Line ""
}

function RelPath($Path) {
  if ($null -eq $Path) {
    return ""
  }

  return $Path.Replace($Root, "")
}

Ensure-Dir "$Root\docs\audit"

[System.IO.File]::WriteAllText(
  $Report,
  "# TERRAGEST V2 - AUDIT DOUBLONS / CONVERGENCE`r`n",
  [System.Text.Encoding]::UTF8
)

Add-Line "Date : $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Add-Line "Racine : $Root"

Section "1. Dossiers UI concurrents"

$UiFolders = @(
  "src\components\erp\ui",
  "src\components\erp\page",
  "src\components\erp\theme",
  "src\components\erp\forms",
  "src\components\ui",
  "src\components\crud",
  "src\components\layout",
  "src\components\shell"
)

foreach ($Folder in $UiFolders) {
  $Full = Join-Path $Root $Folder

  if (Test-Path $Full) {
    $Count = (
      Get-ChildItem -LiteralPath $Full -Recurse -Include *.ts,*.tsx -ErrorAction SilentlyContinue
    ).Count

    Add-Line "- `$Folder` : $Count fichiers"
  } else {
    Add-Line "- `$Folder` : absent"
  }
}

Section "2. Imports legacy encore utilises"

$Patterns = @(
  "@/components/ui",
  "@/components/crud",
  "@/components/layout",
  "@/components/shell",
  "@/components/erp/page",
  "@/components/erp/theme",
  "@/components/erp/forms/ERPButton",
  "@/components/erp/forms/ERPInput"
)

foreach ($Pattern in $Patterns) {
  Add-Line ""
  Add-Line "## $Pattern"
  Add-Line ""

  $Matches =
    Get-ChildItem -LiteralPath "$Root\src" -Recurse -Include *.ts,*.tsx -ErrorAction SilentlyContinue |
    Select-String -Pattern $Pattern -ErrorAction SilentlyContinue

  if (-not $Matches) {
    Add-Line "- OK : aucun usage"
  } else {
    foreach ($Match in $Matches) {
      $Rel = RelPath $Match.Path
      Add-Line ("- {0}:{1} {2}" -f $Rel, $Match.LineNumber, $Match.Line.Trim())
    }
  }
}

Section "3. Composants portant le meme nom"

$ComponentFiles =
  Get-ChildItem -LiteralPath "$Root\src\components" -Recurse -Include *.tsx,*.ts -ErrorAction SilentlyContinue |
  Where-Object { $_.Name -ne "index.ts" }

$Groups =
  $ComponentFiles |
  Group-Object Name |
  Where-Object { $_.Count -gt 1 } |
  Sort-Object Count -Descending

foreach ($Group in $Groups) {
  Add-Line ""
  Add-Line ("## {0} - {1} occurrences" -f $Group.Name, $Group.Count)

  foreach ($File in $Group.Group) {
    $Rel = RelPath $File.FullName
    Add-Line ("- {0}" -f $Rel)
  }
}

Section "4. Pages module dupliquees ou variantes"

$PrivateRoot = "$Root\src\app\(private)"

if (Test-Path $PrivateRoot) {
  $ModuleRouteFolders =
    Get-ChildItem -LiteralPath $PrivateRoot -Directory -ErrorAction SilentlyContinue

  foreach ($Folder in $ModuleRouteFolders) {
    $Pages =
      Get-ChildItem -LiteralPath $Folder.FullName -Recurse -Filter page.tsx -ErrorAction SilentlyContinue

    $Bak =
      Get-ChildItem -LiteralPath $Folder.FullName -Recurse -Include *.bak,*backup* -ErrorAction SilentlyContinue

    if ($Pages.Count -gt 4 -or $Bak.Count -gt 0) {
      Add-Line ""
      Add-Line ("## {0}" -f $Folder.Name)
      Add-Line ("- pages : {0}" -f $Pages.Count)
      Add-Line ("- backups : {0}" -f $Bak.Count)

      foreach ($B in $Bak) {
        $Rel = RelPath $B.FullName
        Add-Line ("  - backup: {0}" -f $Rel)
      }
    }
  }
}

Section "5. Scripts potentiellement concurrents"

$ScriptsRoot = "$Root\scripts"

if (Test-Path $ScriptsRoot) {
  $ScriptFiles =
    Get-ChildItem -LiteralPath $ScriptsRoot -Recurse -Include *.ps1 -ErrorAction SilentlyContinue

  $ScriptGroups =
    $ScriptFiles |
    Group-Object {
      $_.BaseName `
        -replace "setup-", "" `
        -replace "fix-", "" `
        -replace "create-", "" `
        -replace "generate-", "" `
        -replace "connect-", "" `
        -replace "runtime-", ""
    } |
    Where-Object { $_.Count -gt 1 } |
    Sort-Object Count -Descending

  foreach ($Group in $ScriptGroups) {
    Add-Line ""
    Add-Line ("## {0} - {1} scripts" -f $Group.Name, $Group.Count)

    foreach ($File in $Group.Group) {
      $Rel = RelPath $File.FullName
      Add-Line ("- {0}" -f $Rel)
    }
  }
}

Section "6. Classification proposee"

Add-Line "## Officiel"
Add-Line "- src/components/erp/ui"
Add-Line "- src/components/erp/generic"
Add-Line "- src/runtime/modules"
Add-Line "- src/runtime/dashboard"
Add-Line "- scripts/erp/create-business-module-v2.ps1"

Add-Line ""
Add-Line "## Wrappers temporaires"
Add-Line "- src/components/erp/page"
Add-Line "- src/components/erp/theme"
Add-Line "- src/components/erp/forms/ERPButton.tsx"
Add-Line "- src/components/erp/forms/ERPInput.tsx"

Add-Line ""
Add-Line "## Legacy a migrer puis supprimer"
Add-Line "- src/components/ui"
Add-Line "- src/components/crud"
Add-Line "- src/components/layout"
Add-Line "- src/components/shell"

Add-Line ""
Add-Line "## Regle"
Add-Line "- Ne rien supprimer avant migration complete + build OK."
Add-Line "- Supprimer par petits lots."
Add-Line "- Apres chaque lot : pnpm build."

Write-Host ""
Write-Host "OK - Audit doublons genere :" -ForegroundColor Green
Write-Host $Report -ForegroundColor Cyan