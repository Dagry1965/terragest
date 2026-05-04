# =========================================================
# TERRAGEST - CONNECT WORKFLOW STORE
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " CONNECT WORKFLOW STORE"
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

import { WorkflowRuntime }
from "@/platform/workflows/runtime/WorkflowRuntime";

import { WorkflowState }
from "@/platform/workflows/states/WorkflowState";

import { WorkflowStateStore }
from "@/platform/workflows/store/WorkflowStateStore";

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

    const state =
      WorkflowState.DRAFT;

    const entityId =
      crypto.randomUUID();

    WorkflowStateStore.setState(

      entityId,

      state
    );

    WorkflowStateStore.addHistory({

      domain:
        context.domain,

      entityId,

      to:
        state,

      timestamp:
        new Date(),

      user:
        context.user
    });

    await DomainEvents.dispatch(

      `${context.domain}.created`,

      {

        entityId,

        payload:
          context.payload,

        workflowState:
          state
      }
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

  static async transition(

    domain: string,

    entityId: string,

    to: WorkflowState,

    user?: string
  ) {

    const currentState =
      WorkflowStateStore
        .getState(
          entityId
        );

    if (!currentState) {

      throw new Error(
        "Workflow state not found"
      );
    }

    const allowed =
      WorkflowRuntime
        .canTransition(

          domain,

          currentState,

          to
        );

    if (!allowed) {

      throw new Error(
        `Invalid workflow transition: ${currentState} -> ${to}`
      );
    }

    WorkflowStateStore.setState(

      entityId,

      to
    );

    WorkflowStateStore.addHistory({

      domain,

      entityId,

      from:
        currentState,

      to,

      timestamp:
        new Date(),

      user
    });

    console.log(
      "[WORKFLOW TRANSITION]",
      domain,
      currentState,
      to
    );

    await DomainEvents.dispatch(

      `${domain}.workflow.transition`,

      {

        entityId,

        from:
          currentState,

        to
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
Write-Host " WORKFLOW STORE CONNECTED"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\connect-workflow-store-runtime.ps1"
Write-Host "pnpm build"
Write-Host ""