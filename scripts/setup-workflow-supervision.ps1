# =========================================================
# TERRAGEST - WORKFLOW SUPERVISION
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " WORKFLOW SUPERVISION SETUP"
Write-Host "========================================="
Write-Host ""

# =========================================================
# DIRECTORIES
# =========================================================

$directories = @(

  ".\src\platform\workflows\timeline",

  ".\src\platform\workflows\supervision"
)

foreach ($directory in $directories) {

  if (!(Test-Path $directory)) {

    New-Item `
      -ItemType Directory `
      -Path $directory `
      | Out-Null

    Write-Host "[CREATED] $directory"

  } else {

    Write-Host "[EXISTS]  $directory"
  }
}

# =========================================================
# TIMELINE ENTRY
# =========================================================

$timelineEntry = @'
// src/platform/workflows/timeline/WorkflowTimelineEntry.ts

export interface WorkflowTimelineEntry {

  entityId: string;

  domain: string;

  action: string;

  timestamp: Date;

  user?: string;

  metadata?: Record<
    string,
    unknown
  >;
}
'@

Set-Content `
  ".\src\platform\workflows\timeline\WorkflowTimelineEntry.ts" `
  $timelineEntry

Write-Host ""
Write-Host "[CREATED] WorkflowTimelineEntry.ts"

# =========================================================
# WORKFLOW TIMELINE
# =========================================================

$workflowTimeline = @'
// src/platform/workflows/timeline/WorkflowTimeline.ts

import {
  WorkflowTimelineEntry
}
from "@/platform/workflows/timeline/WorkflowTimelineEntry";

class WorkflowTimelineManager {

  private entries:
    WorkflowTimelineEntry[] = [];

  add(
    entry: WorkflowTimelineEntry
  ) {

    this.entries.push(
      entry
    );

    console.log(
      "[TIMELINE]",
      entry.domain,
      entry.action
    );
  }

  getByEntity(
    entityId: string
  ) {

    return this.entries.filter(
      entry =>
        entry.entityId
        === entityId
    );
  }
}

export const WorkflowTimeline =
  new WorkflowTimelineManager();
'@

Set-Content `
  ".\src\platform\workflows\timeline\WorkflowTimeline.ts" `
  $workflowTimeline

Write-Host "[CREATED] WorkflowTimeline.ts"

# =========================================================
# WORKFLOW SUPERVISION
# =========================================================

$workflowSupervision = @'
// src/platform/workflows/supervision/WorkflowSupervision.ts

import { WorkflowStateStore }
from "@/platform/workflows/store/WorkflowStateStore";

class WorkflowSupervisionManager {

  printState(
    entityId: string
  ) {

    const state =
      WorkflowStateStore
        .getState(
          entityId
        );

    console.log(
      "[WORKFLOW STATE]",
      entityId,
      state
    );
  }
}

export const WorkflowSupervision =
  new WorkflowSupervisionManager();
'@

Set-Content `
  ".\src\platform\workflows\supervision\WorkflowSupervision.ts" `
  $workflowSupervision

Write-Host "[CREATED] WorkflowSupervision.ts"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " WORKFLOW SUPERVISION READY"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\setup-workflow-supervision.ps1"
Write-Host "pnpm build"
Write-Host ""