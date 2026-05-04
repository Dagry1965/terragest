# =========================================================
# TERRAGEST - WORKFLOW STATE MACHINE
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " WORKFLOW STATE MACHINE SETUP"
Write-Host "========================================="
Write-Host ""

# =========================================================
# DIRECTORIES
# =========================================================

$directories = @(

  ".\src\platform\workflows\states",

  ".\src\platform\workflows\runtime",

  ".\src\platform\workflows\registry"
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
# WORKFLOW STATE
# =========================================================

$workflowState = @'
// src/platform/workflows/states/WorkflowState.ts

export enum WorkflowState {

  DRAFT =
    "DRAFT",

  VALIDATED =
    "VALIDATED",

  APPROVED =
    "APPROVED",

  IN_PROGRESS =
    "IN_PROGRESS",

  COMPLETED =
    "COMPLETED",

  ARCHIVED =
    "ARCHIVED",

  CANCELLED =
    "CANCELLED"
}
'@

Set-Content `
  ".\src\platform\workflows\states\WorkflowState.ts" `
  $workflowState

Write-Host ""
Write-Host "[CREATED] WorkflowState.ts"

# =========================================================
# STATE TRANSITION
# =========================================================

$stateTransition = @'
// src/platform/workflows/states/StateTransition.ts

import { WorkflowState }
from "@/platform/workflows/states/WorkflowState";

export interface StateTransition {

  from:
    WorkflowState;

  to:
    WorkflowState;
}
'@

Set-Content `
  ".\src\platform\workflows\states\StateTransition.ts" `
  $stateTransition

Write-Host "[CREATED] StateTransition.ts"

# =========================================================
# WORKFLOW REGISTRY
# =========================================================

$workflowRegistry = @'
// src/platform/workflows/registry/WorkflowRegistry.ts

import {
  StateTransition
}
from "@/platform/workflows/states/StateTransition";

class WorkflowRegistryManager {

  private transitions:
    Record<string, StateTransition[]>
    = {};

  register(

    domain: string,

    transitions:
      StateTransition[]
  ) {

    this.transitions[
      domain
    ] = transitions;

    console.log(
      "[WORKFLOW REGISTERED]",
      domain
    );
  }

  getTransitions(
    domain: string
  ) {

    return (
      this.transitions[
        domain
      ] || []
    );
  }
}

export const WorkflowRegistry =
  new WorkflowRegistryManager();
'@

Set-Content `
  ".\src\platform\workflows\registry\WorkflowRegistry.ts" `
  $workflowRegistry

Write-Host "[CREATED] WorkflowRegistry.ts"

# =========================================================
# WORKFLOW RUNTIME
# =========================================================

$workflowRuntime = @'
// src/platform/workflows/runtime/WorkflowRuntime.ts

import { WorkflowState }
from "@/platform/workflows/states/WorkflowState";

import { WorkflowRegistry }
from "@/platform/workflows/registry/WorkflowRegistry";

export class WorkflowRuntime {

  static canTransition(

    domain: string,

    from: WorkflowState,

    to: WorkflowState
  ) {

    const transitions =
      WorkflowRegistry
        .getTransitions(
          domain
        );

    return transitions.some(
      transition =>

        transition.from === from
        &&

        transition.to === to
    );
  }
}
'@

Set-Content `
  ".\src\platform\workflows\runtime\WorkflowRuntime.ts" `
  $workflowRuntime

Write-Host "[CREATED] WorkflowRuntime.ts"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " WORKFLOW STATE MACHINE READY"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\setup-workflow-state-machine.ps1"
Write-Host "pnpm build"
Write-Host ""