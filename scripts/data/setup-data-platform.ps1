# ==========================================
# TERRAGEST V2
# DATA PLATFORM + EVENT SOURCING SETUP
# ==========================================

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " DATA PLATFORM SETUP "
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

$Root = Resolve-Path "."
$Src = Join-Path $Root "src"

$Data = Join-Path `
    $Src `
    "runtime\data"

$ReportRoot = Join-Path `
    $Root `
    "reports\data"

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
Write-Host "Preparing data platform..." -ForegroundColor Cyan
Write-Host ""

Ensure-Directory $Data
Ensure-Directory $ReportRoot

$Folders = @(
    "analytics",
    "cqrs",
    "event-store",
    "forecast",
    "projections",
    "read-models",
    "reporting",
    "warehouse"
)

foreach ($Folder in $Folders) {

    Ensure-Directory `
        (Join-Path $Data $Folder)
}

# ==========================================
# EVENT STORE
# ==========================================

Write-Host ""
Write-Host "Creating EventStore..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Data `
        "event-store\EventStore.ts"
    ) `
@"
export class EventStore {

  private events:
    unknown[] = [];

  append(
    event: unknown
  ) {

    this.events.push(event);

    console.log(
      "[EventStore]",
      event
    );
  }

  getAll() {

    return this.events;
  }
}
"@

# ==========================================
# PROJECTION ENGINE
# ==========================================

Write-Host ""
Write-Host "Creating ProjectionEngine..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Data `
        "projections\ProjectionEngine.ts"
    ) `
@"
export class ProjectionEngine {

  project(
    event: unknown
  ) {

    console.log(
      "[Projection]",
      event
    );
  }
}
"@

# ==========================================
# READ MODEL BUILDER
# ==========================================

Write-Host ""
Write-Host "Creating ReadModelBuilder..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Data `
        "read-models\ReadModelBuilder.ts"
    ) `
@"
export class ReadModelBuilder {

  build(
    model: string
  ) {

    console.log(
      "[ReadModel]",
      model
    );
  }
}
"@

# ==========================================
# CQRS BUS
# ==========================================

Write-Host ""
Write-Host "Creating CQRSBus..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Data `
        "cqrs\CQRSBus.ts"
    ) `
@"
export class CQRSBus {

  command(
    name: string
  ) {

    console.log(
      "[Command]",
      name
    );
  }

  query(
    name: string
  ) {

    console.log(
      "[Query]",
      name
    );
  }
}
"@

# ==========================================
# ANALYTICS ENGINE
# ==========================================

Write-Host ""
Write-Host "Creating AnalyticsEngine..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Data `
        "analytics\AnalyticsEngine.ts"
    ) `
@"
export class AnalyticsEngine {

  analyze(
    dataset: string
  ) {

    console.log(
      "[Analytics]",
      dataset
    );
  }
}
"@

# ==========================================
# REPORTING ENGINE
# ==========================================

Write-Host ""
Write-Host "Creating ReportingEngine..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Data `
        "reporting\ReportingEngine.ts"
    ) `
@"
export class ReportingEngine {

  generate(
    report: string
  ) {

    console.log(
      "[Reporting]",
      report
    );
  }
}
"@

# ==========================================
# FORECAST ENGINE
# ==========================================

Write-Host ""
Write-Host "Creating ForecastEngine..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Data `
        "forecast\ForecastEngine.ts"
    ) `
@"
export class ForecastEngine {

  predict(
    model: string
  ) {

    console.log(
      "[Forecast]",
      model
    );
  }
}
"@

# ==========================================
# DATA WAREHOUSE CONNECTOR
# ==========================================

Write-Host ""
Write-Host "Creating DataWarehouseConnector..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Data `
        "warehouse\DataWarehouseConnector.ts"
    ) `
@"
export class DataWarehouseConnector {

  connect(
    warehouse: string
  ) {

    console.log(
      "[Warehouse]",
      warehouse
    );
  }
}
"@

# ==========================================
# REPORT
# ==========================================

Write-Host ""
Write-Host "Generating data platform report..." -ForegroundColor Cyan
Write-Host ""

$ReportFile = Join-Path `
    $ReportRoot `
    "data-platform.md"

$Report = @"
# DATA PLATFORM SETUP

Generated : $(Get-Date)

## CREATED

- EventStore.ts
- ProjectionEngine.ts
- ReadModelBuilder.ts
- CQRSBus.ts
- AnalyticsEngine.ts
- ReportingEngine.ts
- ForecastEngine.ts
- DataWarehouseConnector.ts

## OBJECTIVE

Introduce event sourcing and ERP analytics platform.

## FLOW

Event
→ Event Store
→ Projection
→ Read Model
→ CQRS
→ Analytics
→ Forecast
→ Reporting

## STATUS

Data platform initialized successfully.
"@

$Report | Out-File `
    $ReportFile `
    -Encoding UTF8

# ==========================================
# DONE
# ==========================================

Write-Host ""
Write-Host "==================================================" -ForegroundColor Green
Write-Host " DATA PLATFORM READY "
Write-Host "==================================================" -ForegroundColor Green
Write-Host ""

Write-Host "Report :" -ForegroundColor Yellow
Write-Host $ReportFile
Write-Host ""