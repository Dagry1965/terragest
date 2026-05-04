# =========================================================
# TERRAGEST - WORKFLOW STATE STORE
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " WORKFLOW STATE STORE SETUP"
Write-Host "========================================="
Write-Host ""

# =========================================================
# DIRECTORIES
# =========================================================

$directories = @(

  ".\src\platform\workflows\store",

  ".\src\platform\workflows\history"
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
# WORKFLOW HISTORY ENTRY
# =========================================================

$workflowHistoryEntry = @'
// src/platform/workflows/history/WorkflowHistoryEntry.ts

import { WorkflowState }
from "@/platform/workflows/states/WorkflowState";

export interface WorkflowHistoryEntry {

  domain: string;

  entityId: string;

  from?: WorkflowState;

  to: WorkflowState;

  timestamp: Date;

  user?: string;
}
'@

Set-Content `
  ".\src\platform\workflows\history\WorkflowHistoryEntry.ts" `
  $workflowHistoryEntry

Write-Host ""
Write-Host "[CREATED] WorkflowHistoryEntry.ts"

# =========================================================
# WORKFLOW STORE
# =========================================================

$workflowStore = @'
// src/platform/workflows/store/WorkflowStateStore.ts

import { WorkflowState }
from "@/platform/workflows/states/WorkflowState";

import {
  WorkflowHistoryEntry
}
from "@/platform/workflows/history/WorkflowHistoryEntry";

class WorkflowStateStoreManager {

  private states:
    Record<string, WorkflowState>
    = {};

  private history:
    WorkflowHistoryEntry[] = [];

  setState(

    entityId: string,

    state: WorkflowState
  ) {

    this.states[
      entityId
    ] = state;
  }

  getState(
    entityId: string
  ) {

    return this.states[
      entityId
    ];
  }

  addHistory(
    entry: WorkflowHistoryEntry
  ) {

    this.history.push(
      entry
    );

    console.log(
      "[WORKFLOW HISTORY]",
      entry.domain,
      entry.entityId,
      entry.to
    );
  }

  getHistory(
    entityId: string
  ) {

    return this.history.filter(
      entry =>
        entry.entityId
        === entityId
    );
  }
}

export const WorkflowStateStore =
  new WorkflowStateStoreManager();
'@

Set-Content `
  ".\src\platform\workflows\store\WorkflowStateStore.ts" `
  $workflowStore

Write-Host "[CREATED] WorkflowStateStore.ts"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " WORKFLOW STORE READY"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\setup-workflow-store.ps1"
Write-Host "pnpm build"
Write-Host ""