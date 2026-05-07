Write-Host "=== TERRAGEST_V2 - CONNECT RUNTIME TIMELINE ===" -ForegroundColor Cyan

$file = "src/core/actions/erp-action-engine.ts"

$content = Get-Content $file -Raw

$content = $content -replace 'import "@/core/hooks/register-hooks";',
'import "@/core/hooks/register-hooks";
import { pushRuntimeEntry } from "@/core/runtime/runtime-timeline";'

$content = $content -replace 'console\.log\("ERP ACTION EXECUTION", payload\);',
'console.log("ERP ACTION EXECUTION", payload);

  pushRuntimeEntry({
    module: payload.module,
    action: payload.action,
    type: "action",
    status: "success",
    entityId: payload.data?.id,
    message:
      `ERP action ${payload.action} exécutée`,
  });'

$content = $content -replace 'console\.log\("DOMAIN EVENT", event\);',
'console.log("DOMAIN EVENT", event);

  pushRuntimeEntry({
    module: payload.module,
    action: payload.action,
    type: "event",
    status: "success",
    entityId: payload.data?.id,
    message:
      `Domain event ${event}`,
  });'

$content = $content -replace 'console\.log\("WORKFLOW EXECUTION", \{
\s+workflow:
\s+`\$\{payload\.module\}\.\$\{payload\.action\}\.workflow`,
\s+\}\);',
'console.log("WORKFLOW EXECUTION", {
    workflow:
      `${payload.module}.${payload.action}.workflow`,
  });

  pushRuntimeEntry({
    module: payload.module,
    action: payload.action,
    type: "workflow",
    status: "success",
    entityId: payload.data?.id,
    message:
      `Workflow ${payload.module}.${payload.action}.workflow`,
  });'

$content = $content -replace 'console\.log\("AUDIT ENTRY CREATED"\);',
'console.log("AUDIT ENTRY CREATED");

  pushRuntimeEntry({
    module: payload.module,
    action: payload.action,
    type: "audit",
    status: "success",
    entityId: payload.data?.id,
    message:
      "Audit runtime enregistré",
  });'

$content = $content -replace 'console\.log\("SUPERVISION UPDATED"\);',
'console.log("SUPERVISION UPDATED");

  pushRuntimeEntry({
    module: payload.module,
    action: payload.action,
    type: "supervision",
    status: "success",
    entityId: payload.data?.id,
    message:
      "Supervision runtime mise à jour",
  });'

Set-Content $file $content

Write-Host "=== RUNTIME TIMELINE connectée au ACTION ENGINE ===" -ForegroundColor Green