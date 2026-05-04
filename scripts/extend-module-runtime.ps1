# =========================================================
# TERRAGEST - EXTEND MODULE RUNTIME
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " EXTEND MODULE RUNTIME"
Write-Host "========================================="
Write-Host ""

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
          "create",

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
          "create",

        payload:
          context.payload,

        user:
          context.user
      }
    );
  }

  static async update(
    context: ModuleContext
  ) {

    await RulePipelineRuntime.execute(

      PipelineType.BEFORE_UPDATE,

      {
        domain:
          context.domain,

        action:
          "update",

        payload:
          context.payload,

        user:
          context.user
      }
    );

    console.log(
      "[MODULE UPDATE]",
      context.domain
    );

    await RulePipelineRuntime.execute(

      PipelineType.AFTER_UPDATE,

      {
        domain:
          context.domain,

        action:
          "update",

        payload:
          context.payload,

        user:
          context.user
      }
    );
  }

  static async delete(
    context: ModuleContext
  ) {

    await RulePipelineRuntime.execute(

      PipelineType.BEFORE_DELETE,

      {
        domain:
          context.domain,

        action:
          "delete",

        payload:
          context.payload,

        user:
          context.user
      }
    );

    console.log(
      "[MODULE DELETE]",
      context.domain
    );

    await RulePipelineRuntime.execute(

      PipelineType.AFTER_DELETE,

      {
        domain:
          context.domain,

        action:
          "delete",

        payload:
          context.payload,

        user:
          context.user
      }
    );
  }

  static async validate(
    context: ModuleContext
  ) {

    console.log(
      "[MODULE VALIDATE]",
      context.domain
    );
  }

  static async approve(
    context: ModuleContext
  ) {

    console.log(
      "[MODULE APPROVE]",
      context.domain
    );
  }

  static async archive(
    context: ModuleContext
  ) {

    console.log(
      "[MODULE ARCHIVE]",
      context.domain
    );
  }

  static async sync(
    context: ModuleContext
  ) {

    console.log(
      "[MODULE SYNC]",
      context.domain
    );
  }
}
'@

Set-Content `
  ".\src\platform\modules\runtime\ModuleRuntime.ts" `
  $moduleRuntime

Write-Host ""
Write-Host "[UPDATED] ModuleRuntime.ts"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " MODULE RUNTIME EXTENDED"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\extend-module-runtime.ps1"
Write-Host "pnpm build"
Write-Host ""