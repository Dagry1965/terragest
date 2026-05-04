# =========================================================
# TERRAGEST - MODULE RUNTIME
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " MODULE RUNTIME SETUP"
Write-Host "========================================="
Write-Host ""

# =========================================================
# DIRECTORIES
# =========================================================

$directories = @(

  ".\src\platform\modules",

  ".\src\platform\modules\runtime",

  ".\src\platform\modules\types"
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
# EXECUTION MODE
# =========================================================

$executionMode = @'
// src/platform/modules/types/ExecutionMode.ts

export enum ExecutionMode {

  LIGHT =
    "LIGHT",

  STANDARD =
    "STANDARD",

  CRITICAL =
    "CRITICAL"
}
'@

Set-Content `
  ".\src\platform\modules\types\ExecutionMode.ts" `
  $executionMode

Write-Host ""
Write-Host "[CREATED] ExecutionMode.ts"

# =========================================================
# MODULE CONTEXT
# =========================================================

$moduleContext = @'
// src/platform/modules/types/ModuleContext.ts

import { ExecutionMode }
from "@/platform/modules/types/ExecutionMode";

export interface ModuleContext {

  domain: string;

  action: string;

  mode:
    ExecutionMode;

  payload?: unknown;

  user?: string;
}
'@

Set-Content `
  ".\src\platform\modules\types\ModuleContext.ts" `
  $moduleContext

Write-Host "[CREATED] ModuleContext.ts"

# =========================================================
# MODULE RUNTIME
# =========================================================

$moduleRuntime = @'
// src/platform/modules/runtime/ModuleRuntime.ts

import {
  ModuleContext
}
from "@/platform/modules/types/ModuleContext";

import { PipelineType }
from "@/platform/rules/pipelines/PipelineType";

import { RulePipelineRuntime }
from "@/platform/rules/runtime/RulePipelineRuntime";

export class ModuleRuntime {

  static async create(
    context: ModuleContext
  ) {

    await RulePipelineRuntime.execute(

      PipelineType.BEFORE_CREATE,

      {
        domain:
          context.domain,

        action:
          context.action,

        payload:
          context.payload,

        user:
          context.user
      }
    );

    console.log(
      "[MODULE CREATE]",
      context.domain
    );

    await RulePipelineRuntime.execute(

      PipelineType.AFTER_CREATE,

      {
        domain:
          context.domain,

        action:
          context.action,

        payload:
          context.payload,

        user:
          context.user
      }
    );
  }
}
'@

Set-Content `
  ".\src\platform\modules\runtime\ModuleRuntime.ts" `
  $moduleRuntime

Write-Host "[CREATED] ModuleRuntime.ts"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " MODULE RUNTIME READY"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host "pnpm build"
Write-Host ""