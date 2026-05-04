# =========================================================
# TERRAGEST - STOCK MODULE RUNTIME
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " STOCK MODULE RUNTIME SETUP"
Write-Host "========================================="
Write-Host ""

# =========================================================
# DIRECTORIES
# =========================================================

$directories = @(

  ".\src\domains\stock",

  ".\src\domains\stock\services",

  ".\src\domains\stock\rules"
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
# STOCK SERVICE
# =========================================================

$stockService = @'
// src/domains/stock/services/StockService.ts

import { ModuleRuntime }
from "@/platform/modules/runtime/ModuleRuntime";

import { ExecutionMode }
from "@/platform/modules/types/ExecutionMode";

export class StockService {

  static async create(
    payload: unknown
  ) {

    await ModuleRuntime.create({

      domain: "stock",

      action: "create",

      mode:
        ExecutionMode.STANDARD,

      payload
    });
  }
}
'@

Set-Content `
  ".\src\domains\stock\services\StockService.ts" `
  $stockService

Write-Host ""
Write-Host "[CREATED] StockService.ts"

# =========================================================
# STOCK VALIDATION RULE
# =========================================================

$stockRule = @'
// src/domains/stock/rules/PreventNegativeStockRule.ts

import {
  PipelineRule
}
from "@/platform/rules/types/PipelineRule";

import { PipelineType }
from "@/platform/rules/pipelines/PipelineType";

export const PreventNegativeStockRule:
  PipelineRule = {

  name:
    "prevent-negative-stock",

  domain:
    "stock",

  action:
    "create",

  pipeline:
    PipelineType.BEFORE_CREATE,

  priority:
    100,

  async execute(
    context
  ) {

    console.log(
      "[RULE] prevent negative stock",
      context.payload
    );
  }
};
'@

Set-Content `
  ".\src\domains\stock\rules\PreventNegativeStockRule.ts" `
  $stockRule

Write-Host "[CREATED] PreventNegativeStockRule.ts"

# =========================================================
# REGISTER STOCK RULES
# =========================================================

$registerStockRules = @'
// src/domains/stock/rules/registerStockRules.ts

import { RulePipelineRuntime }
from "@/platform/rules/runtime/RulePipelineRuntime";

import { PreventNegativeStockRule }
from "@/domains/stock/rules/PreventNegativeStockRule";

export function registerStockRules() {

  RulePipelineRuntime.register(
    PreventNegativeStockRule
  );
}
'@

Set-Content `
  ".\src\domains\stock\rules\registerStockRules.ts" `
  $registerStockRules

Write-Host "[CREATED] registerStockRules.ts"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " STOCK MODULE READY"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\setup-stock-module-runtime.ps1"
Write-Host "pnpm build"
Write-Host ""