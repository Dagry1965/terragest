# ==========================================
# TERRAGEST V2
# ENTERPRISE UI CONSOLIDATION
# ==========================================

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " ENTERPRISE UI CONSOLIDATION "
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

$Root = Resolve-Path "."
$Src = Join-Path $Root "src"

$UI = Join-Path $Src "ui"

$BackupRoot = Join-Path `
    $Root `
    "backups\ui-consolidation"

$ReportRoot = Join-Path `
    $Root `
    "reports\architecture"

# ==========================================
# HELPERS
# ==========================================

function Ensure-Directory {

    param([string]$Path)

    if (!(Test-Path $Path)) {

        New-Item `
            -ItemType Directory `
            -Path $Path `
            -Force | Out-Null

        Write-Host "CREATED : $Path" -ForegroundColor Green
    }
    else {

        Write-Host "EXISTS  : $Path" -ForegroundColor Yellow
    }
}

function Safe-Backup {

    param([string]$Source)

    if (!(Test-Path $Source)) {
        return
    }

    $Timestamp = Get-Date -Format "yyyyMMdd-HHmmss"

    $BackupDir = Join-Path `
        $BackupRoot `
        $Timestamp

    Ensure-Directory $BackupDir

    $Name = Split-Path $Source -Leaf

    Copy-Item `
        $Source `
        (Join-Path $BackupDir $Name) `
        -Recurse `
        -Force

    Write-Host "BACKUP : $Source" -ForegroundColor Green
}

function Create-Placeholder {

    param(
        [string]$Path,
        [string]$Content
    )

    if (!(Test-Path $Path)) {

        $Content | Out-File `
            $Path `
            -Encoding UTF8

        Write-Host "CREATED : $Path" -ForegroundColor Green
    }
    else {

        Write-Host "EXISTS  : $Path" -ForegroundColor Yellow
    }
}

# ==========================================
# PREPARE
# ==========================================

Ensure-Directory $BackupRoot
Ensure-Directory $ReportRoot

Ensure-Directory $UI
Ensure-Directory (Join-Path $UI "shell")
Ensure-Directory (Join-Path $UI "sidebar")
Ensure-Directory (Join-Path $UI "topbar")
Ensure-Directory (Join-Path $UI "navigation")
Ensure-Directory (Join-Path $UI "dashboard")

# ==========================================
# DETECT DUPLICATES
# ==========================================

Write-Host ""
Write-Host "Scanning UI duplicates..." -ForegroundColor Cyan
Write-Host ""

$SidebarFiles = Get-ChildItem `
    $Src `
    -Recurse `
    -Include *Sidebar*.tsx `
    -File

$TopbarFiles = Get-ChildItem `
    $Src `
    -Recurse `
    -Include *Topbar*.tsx `
    -File

$DataTableFiles = Get-ChildItem `
    $Src `
    -Recurse `
    -Include *DataTable*.tsx `
    -File

# ==========================================
# BACKUP DUPLICATES
# ==========================================

Write-Host ""
Write-Host "Backing up duplicated UI..." -ForegroundColor Cyan
Write-Host ""

foreach ($File in $SidebarFiles) {

    Safe-Backup $File.FullName
}

foreach ($File in $TopbarFiles) {

    Safe-Backup $File.FullName
}

foreach ($File in $DataTableFiles) {

    Safe-Backup $File.FullName
}

# ==========================================
# CREATE ENTERPRISE UI
# ==========================================

Write-Host ""
Write-Host "Creating enterprise UI..." -ForegroundColor Cyan
Write-Host ""

# ------------------------------------------
# ENTERPRISE SHELL
# ------------------------------------------

Create-Placeholder `
    (Join-Path $UI "shell\EnterpriseShell.tsx") `
@"
type Props = {
  children: React.ReactNode;
};

import ERPSidebar from "../sidebar/ERPSidebar";
import ERPTopbar from "../topbar/ERPTopbar";

export default function EnterpriseShell({
  children,
}: Props) {

  return (
    <div className="flex h-screen w-full">

      <ERPSidebar />

      <div className="flex flex-col flex-1">

        <ERPTopbar />

        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>

      </div>

    </div>
  );
}
"@

# ------------------------------------------
# ERP SIDEBAR
# ------------------------------------------

Create-Placeholder `
    (Join-Path $UI "sidebar\ERPSidebar.tsx") `
@"
export default function ERPSidebar() {

  return (

    <aside className="w-64 border-r bg-white p-4">

      <h2 className="text-xl font-bold">
        ERP Terragest
      </h2>

    </aside>
  );
}
"@

# ------------------------------------------
# ERP TOPBAR
# ------------------------------------------

Create-Placeholder `
    (Join-Path $UI "topbar\ERPTopbar.tsx") `
@"
export default function ERPTopbar() {

  return (

    <header
      className="
        h-16
        border-b
        bg-white
        flex
        items-center
        px-6
      "
    >
      <h1 className="font-semibold">
        Terragest ERP
      </h1>
    </header>
  );
}
"@

# ------------------------------------------
# ENTERPRISE DATATABLE
# ------------------------------------------

Create-Placeholder `
    (Join-Path $Src "shared\tables\EnterpriseDataTable.tsx") `
@"
type Props = {
  children?: React.ReactNode;
};

export default function EnterpriseDataTable({
  children,
}: Props) {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        overflow-hidden
      "
    >
      {children}
    </div>
  );
}
"@

# ==========================================
# INDEX FILES
# ==========================================

Write-Host ""
Write-Host "Creating enterprise exports..." -ForegroundColor Cyan
Write-Host ""

Create-Placeholder `
    (Join-Path $UI "index.ts") `
@"
export { default as EnterpriseShell }
from "./shell/EnterpriseShell";

export { default as ERPSidebar }
from "./sidebar/ERPSidebar";

export { default as ERPTopbar }
from "./topbar/ERPTopbar";
"@

# ==========================================
# REPORT
# ==========================================

Write-Host ""
Write-Host "Generating report..." -ForegroundColor Cyan
Write-Host ""

$ReportFile = Join-Path `
    $ReportRoot `
    "enterprise-ui-consolidation.md"

$SidebarCount = $SidebarFiles.Count
$TopbarCount = $TopbarFiles.Count
$DataTableCount = $DataTableFiles.Count

$Report = @"
# ENTERPRISE UI CONSOLIDATION

Generated : $(Get-Date)

## DETECTED DUPLICATES

Sidebars : $SidebarCount
Topbars : $TopbarCount
DataTables : $DataTableCount

## ENTERPRISE UI CREATED

- ui/shell/EnterpriseShell.tsx
- ui/sidebar/ERPSidebar.tsx
- ui/topbar/ERPTopbar.tsx
- shared/tables/EnterpriseDataTable.tsx

## STRATEGY

Legacy UI not removed.
Migration remains progressive.

## NEXT STEP

Migrate pages progressively to EnterpriseShell.
"@

$Report | Out-File `
    $ReportFile `
    -Encoding UTF8

# ==========================================
# DONE
# ==========================================

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host " UI CONSOLIDATION COMPLETED "
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""

Write-Host "Report :" -ForegroundColor Yellow
Write-Host $ReportFile
Write-Host ""