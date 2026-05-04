# =========================================================
# TERRAGEST - MODULE RUNTIME EVENTS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " MODULE RUNTIME EVENTS"
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

import { DomainEvents }
from "@/platform/events/DomainEvents";

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

    await DomainEvents.dispatch(

      `${context.domain}.created`,

      context.payload
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

    await DomainEvents.dispatch(

      `${context.domain}.updated`,

      context.payload
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

    await DomainEvents.dispatch(

      `${context.domain}.deleted`,

      context.payload
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

    await DomainEvents.dispatch(

      `${context.domain}.validated`,

      context.payload
    );
  }

  static async approve(
    context: ModuleContext
  ) {

    console.log(
      "[MODULE APPROVE]",
      context.domain
    );

    await DomainEvents.dispatch(

      `${context.domain}.approved`,

      context.payload
    );
  }

  static async archive(
    context: ModuleContext
  ) {

    console.log(
      "[MODULE ARCHIVE]",
      context.domain
    );

    await DomainEvents.dispatch(

      `${context.domain}.archived`,

      context.payload
    );
  }

  static async sync(
    context: ModuleContext
  ) {

    console.log(
      "[MODULE SYNC]",
      context.domain
    );

    await DomainEvents.dispatch(

      `${context.domain}.synced`,

      context.payload
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
Write-Host " MODULE EVENTS READY"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\extend-module-runtime-events.ps1"
Write-Host "pnpm build"
Write-Host ""