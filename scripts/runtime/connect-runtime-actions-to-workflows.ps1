$ErrorActionPreference = "Stop"

function Write-Utf8NoBom {
  param(
    [string]$Path,
    [string]$Content
  )

  [System.IO.File]::WriteAllText(
    $Path,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )
}

# =====================================================
# RuntimeActionEngine.ts
# =====================================================

$actionEnginePath =
  "C:\Users\Admin\terragest\src\runtime\actions\RuntimeActionEngine.ts"

$actionEngineContent =
@'
import type {
  ERPModule,
  ERPModuleAction,
}
from "@/runtime/modules/ERPModule";

import {
  WorkflowRuntimeService,
}
from "@/runtime/workflow-persistence/WorkflowRuntimeService";

export class RuntimeActionEngine {

  static getAvailableActions(
    actions: ERPModuleAction[] = [],
    userPermissions: string[] = ["*"]
  ): ERPModuleAction[] {

    return actions.filter((action) => {

      if (!action.permission) {
        return true;
      }

      return (
        userPermissions.includes("*") ||
        userPermissions.includes(action.permission)
      );
    });
  }

  static async execute({

    module,

    action,

    record,

    user,

  }: {

    module?: ERPModule;

    action: ERPModuleAction;

    record?: Record<string, unknown>;

    user?: unknown;

  }) {

    console.log(
      "ERP ACTION EXECUTED",
      {
        module:
          module?.metadata?.key,

        action:
          action.key,

        record,
      }
    );

    const workflow =
      module?.workflows?.[0];

    if (
      workflow &&
      record
    ) {

      const entityId =
        String(
          (record as any)?.id ??
          (record as any)?.uid ??
          (record as any)?.key ??
          ""
        );

      if (entityId) {

        return WorkflowRuntimeService
          .executeTransition({

            module,

            workflow,

            entityId,

            record,

            action:
              action.key,

            user,
          });
      }
    }

    return {
      success: true,
      action,
      record,
    };
  }
}
'@

Write-Utf8NoBom `
  -Path $actionEnginePath `
  -Content $actionEngineContent

Write-Host "UPDATED RuntimeActionEngine.ts"

# =====================================================
# ERPRuntimePage.tsx
# =====================================================

$pagePath =
  "C:\Users\Admin\terragest\src\components\erp\runtime\ERPRuntimePage.tsx"

$pageContent =
  [System.IO.File]::ReadAllText($pagePath)

$pageContent =
  $pageContent.Replace(
@'
        onClick={() =>
          RuntimeActionEngine.execute(
            action,
            record
          )
        }
'@,
@'
        onClick={() =>
          RuntimeActionEngine.execute({
            module,
            action,
            record,
          })
        }
'@
)

Write-Utf8NoBom `
  -Path $pagePath `
  -Content $pageContent

Write-Host "UPDATED ERPRuntimePage.tsx"

Write-Host ""
Write-Host "RUNTIME ACTIONS CONNECTED TO WORKFLOWS"