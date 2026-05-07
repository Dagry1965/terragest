Write-Host "=== TERRAGEST_V2 - CONNECT ERP HOOKS ===" -ForegroundColor Cyan

$file = "src/core/actions/erp-action-engine.ts"

$content = Get-Content $file -Raw

$content = $content -replace 'export type ERPActionPayload =',
'import { executeHooks } from "@/core/hooks/erp-hooks";
import "@/core/hooks/register-hooks";

export type ERPActionPayload ='

$content = $content -replace 'console\.log\("ERP ACTION EXECUTION", payload\);',
'console.log("ERP ACTION EXECUTION", payload);

  const beforeHook =
    payload.action === "create"
      ? "beforeCreate"
      : payload.action === "update"
      ? "beforeUpdate"
      : "beforeDelete";

  await executeHooks(
    payload.module,
    beforeHook as any,
    {
      module: payload.module,
      action: payload.action,
      data: payload.data,
    }
  );'

$content = $content -replace 'console\.log\("SUPERVISION UPDATED"\);',
'console.log("SUPERVISION UPDATED");

  const afterHook =
    payload.action === "create"
      ? "afterCreate"
      : payload.action === "update"
      ? "afterUpdate"
      : "afterDelete";

  await executeHooks(
    payload.module,
    afterHook as any,
    {
      module: payload.module,
      action: payload.action,
      data: payload.data,
    }
  );'

Set-Content $file $content

Write-Host "=== ERP HOOKS connectés au ACTION ENGINE ===" -ForegroundColor Green