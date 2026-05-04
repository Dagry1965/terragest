# =========================================================
# TERRAGEST - CONNECT GOVERNANCE RUNTIME
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " CONNECT GOVERNANCE RUNTIME"
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

import { GovernanceRuntime }
from "@/platform/governance/GovernanceRuntime";

export class ModuleRuntime {

  static async create(
    context: ModuleContext
  ) {

    GovernanceRuntime.validate({

      domain:
        context.domain,

      action:
        "create",

      tenant:
        context.tenant,

      user:
        context.user
    });

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
          context.user,

        tenant:
          context.tenant
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
          context.user,

        tenant:
          context.tenant
      }
    );
  }

  static async update(
    context: ModuleContext
  ) {

    GovernanceRuntime.validate({

      domain:
        context.domain,

      action:
        "update",

      tenant:
        context.tenant,

      user:
        context.user
    });

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
          context.user,

        tenant:
          context.tenant
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
          context.user,

        tenant:
          context.tenant
      }
    );
  }

  static async delete(
    context: ModuleContext
  ) {

    GovernanceRuntime.validate({

      domain:
        context.domain,

      action:
        "delete",

      tenant:
        context.tenant,

      user:
        context.user
    });

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
          context.user,

        tenant:
          context.tenant
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
          context.user,

        tenant:
          context.tenant
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

  tenant?: string;
}
'@

Set-Content `
  ".\src\platform\modules\types\ModuleContext.ts" `
  $moduleContext

Write-Host "[UPDATED] ModuleContext.ts"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " GOVERNANCE CONNECTED"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\connect-governance-runtime.ps1"
Write-Host "pnpm build"
Write-Host ""