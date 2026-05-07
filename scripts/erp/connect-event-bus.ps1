Write-Host "=== TERRAGEST_V2 - CONNECT EVENT BUS ===" -ForegroundColor Cyan

$file = "src/core/actions/erp-action-engine.ts"

$content = Get-Content $file -Raw

$content = $content -replace 'import "@/core/rules/register-rules";',
'import "@/core/rules/register-rules";
import {
  publishEvent,
} from "@/core/event-bus/event-bus";

import "@/core/event-bus/register-event-subscribers";'

$content = $content -replace 'const event =
\s+`\$\{payload\.module\}\.\$\{payload\.action\}`;',
'const event =
    `${payload.module}.${payload.action}`;

  await publishEvent({
    name: event,
    module: payload.module,
    payload: payload.data,
    timestamp:
      new Date().toISOString(),
  });'

Set-Content $file $content

Write-Host "=== EVENT BUS connecté au ACTION ENGINE ===" -ForegroundColor Green