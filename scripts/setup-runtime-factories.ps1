# =========================================================
# TERRAGEST - RUNTIME FACTORIES
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " RUNTIME FACTORIES SETUP"
Write-Host "========================================="
Write-Host ""

# =========================================================
# DIRECTORIES
# =========================================================

$directories = @(

  ".\src\platform\factories"
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
# MODULE SERVICE FACTORY
# =========================================================

$moduleFactory = @'
// src/platform/factories/createModuleService.ts

import { ModuleRuntime }
from "@/platform/modules/runtime/ModuleRuntime";

import { ExecutionMode }
from "@/platform/modules/types/ExecutionMode";

export function createModuleService(
  domain: string
) {

  return {

    async create(
      payload: unknown
    ) {

      await ModuleRuntime.create({

        domain,

        action: "create",

        mode:
          ExecutionMode.STANDARD,

        payload
      });
    }
  };
}
'@

Set-Content `
  ".\src\platform\factories\createModuleService.ts" `
  $moduleFactory

Write-Host ""
Write-Host "[CREATED] createModuleService.ts"

# =========================================================
# PIPELINE RULE FACTORY
# =========================================================

$ruleFactory = @'
// src/platform/factories/createPipelineRule.ts

import {
  PipelineRule
}
from "@/platform/rules/types/PipelineRule";

import { PipelineType }
from "@/platform/rules/pipelines/PipelineType";

interface CreatePipelineRuleOptions {

  name: string;

  domain: string;

  action: string;

  pipeline: PipelineType;

  priority?: number;

  execute(
    context: unknown
  ): Promise<void> | void;
}

export function createPipelineRule(
  options: CreatePipelineRuleOptions
): PipelineRule {

  return {

    name:
      options.name,

    domain:
      options.domain,

    action:
      options.action,

    pipeline:
      options.pipeline,

    priority:
      options.priority,

    execute:
      options.execute
  };
}
'@

Set-Content `
  ".\src\platform\factories\createPipelineRule.ts" `
  $ruleFactory

Write-Host "[CREATED] createPipelineRule.ts"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " RUNTIME FACTORIES READY"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\setup-runtime-factories.ps1"
Write-Host "pnpm build"
Write-Host ""