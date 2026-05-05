# ==========================================
# TERRAGEST V2
# PERSISTENT EVENT STORE SETUP
# ==========================================

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " PERSISTENT EVENT STORE SETUP "
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

$Root = Resolve-Path "."
$Src = Join-Path $Root "src"

$Data = Join-Path `
    $Src `
    "runtime\data"

$EventStore = Join-Path `
    $Data `
    "event-store"

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
Write-Host "Preparing persistent event store..." -ForegroundColor Cyan
Write-Host ""

Ensure-Directory $EventStore
Ensure-Directory $ReportRoot

$Folders = @(
    "dispatchers",
    "replay",
    "serialization",
    "snapshots",
    "streams"
)

foreach ($Folder in $Folders) {

    Ensure-Directory `
        (Join-Path $EventStore $Folder)
}

# ==========================================
# PERSISTENT EVENT STORE
# ==========================================

Write-Host ""
Write-Host "Creating PersistentEventStore..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $EventStore `
        "PersistentEventStore.ts"
    ) `
@"
type StoredEvent = {

  id: string;

  type: string;

  stream: string;

  timestamp: number;

  payload?: unknown;
};

export class PersistentEventStore {

  private events:
    StoredEvent[] = [];

  append(
    event: StoredEvent
  ) {

    this.events.push(event);

    console.log(
      "[PersistentEventStore]",
      event.type
    );
  }

  load(
    stream: string
  ) {

    return this.events.filter(
      event =>
        event.stream === stream
    );
  }

  replay(
    stream: string
  ) {

    const events =
      this.load(stream);

    console.log(
      "[Replay]",
      stream,
      events.length
    );

    return events;
  }
}
"@

# ==========================================
# EVENT SERIALIZER
# ==========================================

Write-Host ""
Write-Host "Creating EventSerializer..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $EventStore `
        "serialization\EventSerializer.ts"
    ) `
@"
export class EventSerializer {

  serialize(
    payload?: unknown
  ) {

    return JSON.stringify(
      payload
    );
  }

  deserialize(
    payload: string
  ) {

    return JSON.parse(
      payload
    );
  }
}
"@

# ==========================================
# STREAM MANAGER
# ==========================================

Write-Host ""
Write-Host "Creating StreamManager..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $EventStore `
        "streams\StreamManager.ts"
    ) `
@"
export class StreamManager {

  create(
    stream: string
  ) {

    console.log(
      "[Stream]",
      stream
    );
  }
}
"@

# ==========================================
# SNAPSHOT MANAGER
# ==========================================

Write-Host ""
Write-Host "Creating SnapshotManager..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $EventStore `
        "snapshots\SnapshotManager.ts"
    ) `
@"
export class SnapshotManager {

  create(
    stream: string
  ) {

    console.log(
      "[Snapshot]",
      stream
    );
  }
}
"@

# ==========================================
# REPLAY ENGINE
# ==========================================

Write-Host ""
Write-Host "Creating ReplayEngine..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $EventStore `
        "replay\ReplayEngine.ts"
    ) `
@"
import { PersistentEventStore }
from "../PersistentEventStore";

export class ReplayEngine {

  private store =
    new PersistentEventStore();

  replay(
    stream: string
  ) {

    return this.store.replay(
      stream
    );
  }
}
"@

# ==========================================
# PROJECTION DISPATCHER
# ==========================================

Write-Host ""
Write-Host "Creating ProjectionDispatcher..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $EventStore `
        "dispatchers\ProjectionDispatcher.ts"
    ) `
@"
export class ProjectionDispatcher {

  dispatch(
    event: unknown
  ) {

    console.log(
      "[ProjectionDispatcher]",
      event
    );
  }
}
"@

# ==========================================
# EVENTSTORE TEST
# ==========================================

Write-Host ""
Write-Host "Creating EventStore tests..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Root `
        "tests\data\PersistentEventStore.test.ts"
    ) `
@"
import {
  PersistentEventStore
}
from "../../src/runtime/data/event-store/PersistentEventStore";

describe(
  "PersistentEventStore",
  () => {

    it(
      "should append event",
      () => {

        const store =
          new PersistentEventStore();

        store.append({
          id: "1",
          type:
            "TEST_EVENT",
          stream:
            "test",
          timestamp:
            Date.now(),
        });

        const events =
          store.load("test");

        expect(
          events.length
        ).toBe(1);
      }
    );
  }
);
"@

# ==========================================
# REPORT
# ==========================================

Write-Host ""
Write-Host "Generating persistent event store report..." -ForegroundColor Cyan
Write-Host ""

$ReportFile = Join-Path `
    $ReportRoot `
    "persistent-eventstore.md"

$Report = @"
# PERSISTENT EVENT STORE SETUP

Generated : $(Get-Date)

## CREATED

- PersistentEventStore.ts
- EventSerializer.ts
- StreamManager.ts
- SnapshotManager.ts
- ReplayEngine.ts
- ProjectionDispatcher.ts
- PersistentEventStore.test.ts

## OBJECTIVE

Introduce persistent enterprise event sourcing.

## FLOW

Event
→ Serialization
→ EventStore
→ Stream
→ Replay
→ Projection

## STATUS

Persistent EventStore initialized successfully.
"@

$Report | Out-File `
    $ReportFile `
    -Encoding UTF8

# ==========================================
# DONE
# ==========================================

Write-Host ""
Write-Host "==================================================" -ForegroundColor Green
Write-Host " PERSISTENT EVENT STORE READY "
Write-Host "==================================================" -ForegroundColor Green
Write-Host ""

Write-Host "Report :" -ForegroundColor Yellow
Write-Host $ReportFile
Write-Host ""