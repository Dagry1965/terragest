# ==========================================
# TERRAGEST V2
# FIRESTORE ENTERPRISE PERSISTENCE
# ==========================================

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " FIRESTORE PERSISTENCE SETUP "
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

$Root = Resolve-Path "."
$Src = Join-Path $Root "src"

$Persistence = Join-Path `
    $Src `
    "runtime\persistence"

$ReportRoot = Join-Path `
    $Root `
    "reports\persistence"

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
Write-Host "Preparing persistence layer..." -ForegroundColor Cyan
Write-Host ""

Ensure-Directory $Persistence
Ensure-Directory $ReportRoot

$Folders = @(
    "analytics",
    "audit",
    "events",
    "processes",
    "projections",
    "workflows"
)

foreach ($Folder in $Folders) {

    Ensure-Directory `
        (Join-Path `
            $Persistence `
            $Folder
        )
}

# ==========================================
# RUNTIME EVENT REPOSITORY
# ==========================================

Write-Host ""
Write-Host "Creating RuntimeEventRepository..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Persistence `
        "events/RuntimeEventRepository.ts"
    ) `
@"
import {
  collection,
  addDoc,
  getDocs
}
from "firebase/firestore";

import { db }
from "../../../lib/firebase";

export class
RuntimeEventRepository {

  async append(
    payload: unknown
  ) {

    return addDoc(
      collection(
        db,
        "runtime_events"
      ),
      {
        payload,
        createdAt:
          Date.now(),
      }
    );
  }

  async getAll() {

    const snapshot =
      await getDocs(
        collection(
          db,
          "runtime_events"
        )
      );

    return snapshot.docs.map(
      doc => ({
        id: doc.id,
        ...doc.data(),
      })
    );
  }
}
"@

# ==========================================
# WORKFLOW REPOSITORY
# ==========================================

Write-Host ""
Write-Host "Creating WorkflowRepository..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Persistence `
        "workflows/WorkflowRepository.ts"
    ) `
@"
import {
  collection,
  addDoc
}
from "firebase/firestore";

import { db }
from "../../../lib/firebase";

export class WorkflowRepository {

  async save(
    workflow: unknown
  ) {

    return addDoc(
      collection(
        db,
        "runtime_workflows"
      ),
      {
        workflow,
        createdAt:
          Date.now(),
      }
    );
  }
}
"@

# ==========================================
# PROCESS REPOSITORY
# ==========================================

Write-Host ""
Write-Host "Creating ProcessRepository..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Persistence `
        "processes/ProcessRepository.ts"
    ) `
@"
import {
  collection,
  addDoc
}
from "firebase/firestore";

import { db }
from "../../../lib/firebase";

export class ProcessRepository {

  async save(
    process: unknown
  ) {

    return addDoc(
      collection(
        db,
        "runtime_processes"
      ),
      {
        process,
        createdAt:
          Date.now(),
      }
    );
  }
}
"@

# ==========================================
# PROJECTION REPOSITORY
# ==========================================

Write-Host ""
Write-Host "Creating ProjectionRepository..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Persistence `
        "projections/ProjectionRepository.ts"
    ) `
@"
import {
  collection,
  addDoc
}
from "firebase/firestore";

import { db }
from "../../../lib/firebase";

export class ProjectionRepository {

  async save(
    projection: unknown
  ) {

    return addDoc(
      collection(
        db,
        "runtime_projections"
      ),
      {
        projection,
        createdAt:
          Date.now(),
      }
    );
  }
}
"@

# ==========================================
# ANALYTICS REPOSITORY
# ==========================================

Write-Host ""
Write-Host "Creating AnalyticsRepository..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Persistence `
        "analytics/AnalyticsRepository.ts"
    ) `
@"
import {
  collection,
  addDoc
}
from "firebase/firestore";

import { db }
from "../../../lib/firebase";

export class AnalyticsRepository {

  async save(
    analytics: unknown
  ) {

    return addDoc(
      collection(
        db,
        "runtime_analytics"
      ),
      {
        analytics,
        createdAt:
          Date.now(),
      }
    );
  }
}
"@

# ==========================================
# AUDIT REPOSITORY
# ==========================================

Write-Host ""
Write-Host "Creating AuditRepository..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Persistence `
        "audit/AuditRepository.ts"
    ) `
@"
import {
  collection,
  addDoc
}
from "firebase/firestore";

import { db }
from "../../../lib/firebase";

export class AuditRepository {

  async save(
    audit: unknown
  ) {

    return addDoc(
      collection(
        db,
        "runtime_audit"
      ),
      {
        audit,
        createdAt:
          Date.now(),
      }
    );
  }
}
"@

# ==========================================
# FIRESTORE CONFIG CHECK
# ==========================================

Write-Host ""
Write-Host "Creating Firestore health check..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Persistence `
        "FirestoreHealthCheck.ts"
    ) `
@"
import {
  RuntimeEventRepository
}
from "./events/RuntimeEventRepository";

export async function
firestoreHealthCheck() {

  const repository =
    new RuntimeEventRepository();

  const events =
    await repository.getAll();

  console.log(
    "[Firestore Health]",
    events.length
  );
}
"@

# ==========================================
# REPORT
# ==========================================

Write-Host ""
Write-Host "Generating persistence report..." -ForegroundColor Cyan
Write-Host ""

$ReportFile = Join-Path `
    $ReportRoot `
    "firestore-persistence.md"

$Report = @"
# FIRESTORE ENTERPRISE PERSISTENCE

Generated : $(Get-Date)

## CREATED

- RuntimeEventRepository.ts
- WorkflowRepository.ts
- ProcessRepository.ts
- ProjectionRepository.ts
- AnalyticsRepository.ts
- AuditRepository.ts
- FirestoreHealthCheck.ts

## OBJECTIVE

Introduce enterprise runtime persistence layer.

## COLLECTIONS

- runtime_events
- runtime_workflows
- runtime_processes
- runtime_projections
- runtime_analytics
- runtime_audit

## STATUS

Firestore persistence initialized successfully.
"@

$Report | Out-File `
    $ReportFile `
    -Encoding UTF8

# ==========================================
# DONE
# ==========================================

Write-Host ""
Write-Host "==================================================" -ForegroundColor Green
Write-Host " FIRESTORE PERSISTENCE READY "
Write-Host "==================================================" -ForegroundColor Green
Write-Host ""

Write-Host "Report :" -ForegroundColor Yellow
Write-Host $ReportFile
Write-Host ""