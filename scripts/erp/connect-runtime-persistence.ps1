Write-Host "=== TERRAGEST_V2 - CONNECT RUNTIME PERSISTENCE ===" -ForegroundColor Cyan

$file = "src/core/runtime/runtime-timeline.ts"

$content = Get-Content $file -Raw

$content = $content -replace 'export type ERPRuntimeEntry =',
'import { persistRuntimeEntry } from "@/core/persistence/runtime-persistence";

export type ERPRuntimeEntry ='

$content = $content -replace 'console\.log\(
\s+"ERP RUNTIME ENTRY",
\s+runtimeEntry
\s+\);',
'console.log(
    "ERP RUNTIME ENTRY",
    runtimeEntry
  );

  persistRuntimeEntry(
    runtimeEntry
  );'

Set-Content $file $content

Write-Host "=== RUNTIME PERSISTENCE connectée ===" -ForegroundColor Green