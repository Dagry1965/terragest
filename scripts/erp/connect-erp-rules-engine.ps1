Write-Host "=== TERRAGEST_V2 - CONNECT ERP RULES ENGINE ===" -ForegroundColor Cyan

$file = "src/core/actions/erp-action-engine.ts"

$content = Get-Content $file -Raw

$content = $content -replace 'import \{ pushRuntimeEntry \} from "@\/core\/runtime\/runtime-timeline";',
'import { pushRuntimeEntry } from "@/core/runtime/runtime-timeline";
import { executeRules } from "@/core/rules/rules-engine";
import "@/core/rules/register-rules";'

$content = $content -replace 'console\.log\("SUPERVISION UPDATED"\);',
'console.log("SUPERVISION UPDATED");

  await executeRules(
    payload.module,
    payload.data
  );'

Set-Content $file $content

Write-Host "=== ERP RULES ENGINE connecté ===" -ForegroundColor Green