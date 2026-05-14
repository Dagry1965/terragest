$ErrorActionPreference = "Stop"

function Write-Utf8NoBom {
  param(
    [string]$Path,
    [string]$Content
  )

  $dir = Split-Path $Path -Parent

  if (!(Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
  }

  [System.IO.File]::WriteAllText(
    $Path,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )
}

$modulePath =
  "C:\Users\Admin\terragest\src\runtime\modules\ERPModule.ts"

$workflowServicePath =
  "C:\Users\Admin\terragest\src\runtime\workflow-persistence\WorkflowRuntimeService.ts"

# =========================================================
# ERPModule.ts
# =========================================================

$moduleContent =
  [System.IO.File]::ReadAllText($modulePath)

$old =
@'
  initialState?: string;

states?: Array<string | ERPWorkflowState>;

  transitions?: ERPWorkflowTransition[];
'@

$new =
@'
  initialState?: string;

  stateField?: string;

  states?: Array<string | ERPWorkflowState>;

  transitions?: ERPWorkflowTransition[];
'@

$moduleContent =
  $moduleContent.Replace($old, $new)

Write-Utf8NoBom `
  -Path $modulePath `
  -Content $moduleContent

Write-Host "UPDATED ERPModule.ts"

# =========================================================
# WorkflowRuntimeService.ts
# =========================================================

$newWorkflowService =
@'
import {
  WorkflowPersistenceEngine,
}
from "@/runtime/workflow-persistence/WorkflowPersistenceEngine";

import {
  RuntimeWorkflowEngine,
}
from "@/runtime/workflows/RuntimeWorkflowEngine";

import {
  RuntimeDataBinding,
}
from "@/runtime/data-binding";

export class WorkflowRuntimeService {

  static resolveStateField(
    workflow: any,
    record: Record<string, any>
  ) {

    if (workflow?.stateField) {
      return workflow.stateField;
    }

    if ("workflowState" in record) {
      return "workflowState";
    }

    if ("statut" in record) {
      return "statut";
    }

    return "status";
  }

  static async executeTransition({

    module,

    workflow,

    entityId,

    record,

    action,

    user,

    comment,

  }: any) {

    const stateField =
      WorkflowRuntimeService.resolveStateField(
        workflow,
        record
      );

    const currentState =
      record?.[stateField];

    const result =
      RuntimeWorkflowEngine.executeTransition(
        workflow,
        currentState,
        action
      );

    if (!result.success) {
      return result;
    }

    await RuntimeDataBinding.update(
      module,
      entityId,
      {
        [stateField]: result.to,
      }
    );

    await WorkflowPersistenceEngine
      .persistTransition({

        module:
          module.metadata.key,

        entityId,

        fromState:
          result.from,

        toState:
          result.to,

        action:
          result.action,

        user,

        comment,
      });

    return {
      success: true,
      stateField,
      from: result.from,
      to: result.to,
      action: result.action,
    };
  }
}
'@

Write-Utf8NoBom `
  -Path $workflowServicePath `
  -Content $newWorkflowService

Write-Host "UPDATED WorkflowRuntimeService.ts"

Write-Host ""
Write-Host "WORKFLOW EXECUTION LAYER INSTALLED"