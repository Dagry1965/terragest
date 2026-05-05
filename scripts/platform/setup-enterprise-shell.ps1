# ==========================================
# TERRAGEST V2
# ENTERPRISE ERP SHELL
# ==========================================

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " ENTERPRISE ERP SHELL "
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

$Root = Resolve-Path "."
$Src = Join-Path $Root "src"

$Platform = Join-Path `
    $Src `
    "features\platform"

$Observability = Join-Path `
    $Src `
    "features\observability"

$ReportRoot = Join-Path `
    $Root `
    "reports\platform"

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

function Ensure-File {

    param(
        [string]$Path,
        [string]$Content
    )

    $Directory =
      Split-Path $Path

    Ensure-Directory $Directory

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
# STRUCTURE
# ==========================================

Write-Host ""
Write-Host "Preparing ERP shell..." -ForegroundColor Cyan
Write-Host ""

Ensure-Directory $Platform
Ensure-Directory $ReportRoot

$Folders = @(
    "components/layout",
    "components/navigation",
    "components/runtime",
    "components/notifications",
    "dashboards",
    "shell",
    "workspace"
)

foreach ($Folder in $Folders) {

    Ensure-Directory `
        (Join-Path `
            $Platform `
            $Folder
        )
}

# ==========================================
# SIDEBAR
# ==========================================

Write-Host ""
Write-Host "Creating EnterpriseSidebar..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Platform `
        "components/navigation/EnterpriseSidebar.tsx"
    ) `
@"
export default function
EnterpriseSidebar() {

  const items = [

    "Dashboard",
    "Exploitations",
    "Terrains",
    "Matériels",
    "Interventions",
    "Stocks",
    "Workflows",
    "Supervision",
    "Analytics",
    "Runtime",
  ];

  return (

    <aside
      className="
        w-72
        bg-slate-950
        text-white
        min-h-screen
        p-6
      "
    >

      <h1
        className="
          text-2xl
          font-bold
          mb-10
        "
      >
        TERRAGEST V2
      </h1>

      <div
        className="
          flex
          flex-col
          gap-4
        "
      >

        {items.map(item => (

          <div
            key={item}
            className="
              p-3
              rounded-xl
              hover:bg-slate-800
              cursor-pointer
            "
          >
            {item}
          </div>
        ))}

      </div>

    </aside>
  );
}
"@

# ==========================================
# TOPBAR
# ==========================================

Write-Host ""
Write-Host "Creating EnterpriseTopbar..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Platform `
        "components/layout/EnterpriseTopbar.tsx"
    ) `
@"
export default function
EnterpriseTopbar() {

  return (

    <header
      className="
        h-20
        bg-white
        border-b
        flex
        items-center
        justify-between
        px-8
      "
    >

      <div>

        <h2
          className="
            text-2xl
            font-bold
          "
        >
          Enterprise Runtime
        </h2>

      </div>

      <div
        className="
          flex
          items-center
          gap-4
        "
      >

        <div
          className="
            bg-green-100
            text-green-700
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
          "
        >
          Runtime Healthy
        </div>

      </div>

    </header>
  );
}
"@

# ==========================================
# LIVE ACTIVITY PANEL
# ==========================================

Write-Host ""
Write-Host "Creating LiveActivityPanel..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Platform `
        "components/runtime/LiveActivityPanel.tsx"
    ) `
@"
import LiveEventStream
from "../../../observability/widgets/live/LiveEventStream";

export default function
LiveActivityPanel() {

  return (

    <div
      className="
        rounded-2xl
        overflow-hidden
      "
    >

      <LiveEventStream />

    </div>
  );
}
"@

# ==========================================
# NOTIFICATION CENTER
# ==========================================

Write-Host ""
Write-Host "Creating NotificationCenter..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Platform `
        "components/notifications/NotificationCenter.tsx"
    ) `
@"
export default function
NotificationCenter() {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        p-6
      "
    >

      <h2
        className="
          text-lg
          font-semibold
          mb-4
        "
      >
        Notifications
      </h2>

      <p>
        Runtime notifications
        will appear here.
      </p>

    </div>
  );
}
"@

# ==========================================
# RUNTIME CONSOLE
# ==========================================

Write-Host ""
Write-Host "Creating RuntimeConsole..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Platform `
        "components/runtime/RuntimeConsole.tsx"
    ) `
@"
import EventReplayConsole
from "../../../observability/widgets/live/EventReplayConsole";

export default function
RuntimeConsole() {

  return (

    <div
      className="
        rounded-2xl
        overflow-hidden
      "
    >

      <EventReplayConsole />

    </div>
  );
}
"@

# ==========================================
# SUPERVISION DASHBOARD
# ==========================================

Write-Host ""
Write-Host "Creating EnterpriseSupervisionDashboard..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Platform `
        "dashboards/EnterpriseSupervisionDashboard.tsx"
    ) `
@"
import LiveRuntimeDashboard
from "../../observability/dashboards/LiveRuntimeDashboard";

import NotificationCenter
from "../components/notifications/NotificationCenter";

export default function
EnterpriseSupervisionDashboard() {

  return (

    <div
      className="
        grid
        gap-6
      "
    >

      <NotificationCenter />

      <LiveRuntimeDashboard />

    </div>
  );
}
"@

# ==========================================
# ERP WORKSPACE
# ==========================================

Write-Host ""
Write-Host "Creating EnterpriseWorkspace..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Platform `
        "workspace/EnterpriseWorkspace.tsx"
    ) `
@"
import EnterpriseTopbar
from "../components/layout/EnterpriseTopbar";

import EnterpriseSidebar
from "../components/navigation/EnterpriseSidebar";

import EnterpriseSupervisionDashboard
from "../dashboards/EnterpriseSupervisionDashboard";

export default function
EnterpriseWorkspace() {

  return (

    <div
      className="
        flex
        bg-slate-100
      "
    >

      <EnterpriseSidebar />

      <div
        className="
          flex-1
          flex
          flex-col
        "
      >

        <EnterpriseTopbar />

        <main
          className="
            p-8
          "
        >

          <EnterpriseSupervisionDashboard />

        </main>

      </div>

    </div>
  );
}
"@

# ==========================================
# ERP SHELL
# ==========================================

Write-Host ""
Write-Host "Creating EnterpriseShell..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Platform `
        "shell/EnterpriseShell.tsx"
    ) `
@"
import EnterpriseWorkspace
from "../workspace/EnterpriseWorkspace";

export default function
EnterpriseShell() {

  return <EnterpriseWorkspace />;
}
"@

# ==========================================
# REPORT
# ==========================================

Write-Host ""
Write-Host "Generating ERP shell report..." -ForegroundColor Cyan
Write-Host ""

$ReportFile = Join-Path `
    $ReportRoot `
    "enterprise-shell.md"

$Report = @"
# ENTERPRISE ERP SHELL

Generated : $(Get-Date)

## CREATED

- EnterpriseSidebar.tsx
- EnterpriseTopbar.tsx
- LiveActivityPanel.tsx
- NotificationCenter.tsx
- RuntimeConsole.tsx
- EnterpriseSupervisionDashboard.tsx
- EnterpriseWorkspace.tsx
- EnterpriseShell.tsx

## OBJECTIVE

Introduce enterprise ERP cockpit and runtime supervision UI.

## FEATURES

- sidebar
- runtime console
- notifications
- supervision dashboard
- live monitoring
- ERP workspace

## STATUS

Enterprise ERP shell initialized successfully.
"@

$Report | Out-File `
    $ReportFile `
    -Encoding UTF8

# ==========================================
# DONE
# ==========================================

Write-Host ""
Write-Host "==================================================" -ForegroundColor Green
Write-Host " ENTERPRISE SHELL READY "
Write-Host "==================================================" -ForegroundColor Green
Write-Host ""

Write-Host "Report :" -ForegroundColor Yellow
Write-Host $ReportFile
Write-Host ""