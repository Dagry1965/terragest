Write-Host "=== TERRAGEST_V2 - SETUP EVENT JOB PIPELINE ===" -ForegroundColor Cyan

$file = "src/core/event-bus/register-event-subscribers.ts"

$content = Get-Content $file -Raw

$content = $content -replace 'import \{
\s+pushRuntimeEntry,
\s+\} from "@\/core\/runtime\/runtime-timeline";',
'import {
  pushRuntimeEntry,
} from "@/core/runtime/runtime-timeline";

import {
  enqueueJob,
} from "@/core/jobs/job-queue";'

$content = $content -replace 'console\.log\(
\s+"EVENT BUS : maintenance workflow"
\s+\);',
'console.log(
        "EVENT BUS : maintenance workflow"
      );

      enqueueJob({
        name:
          "maintenance-critical-job",

        module: "materiels",

        priority:
          "critical",

        payload:
          event.payload,
      });

      enqueueJob({
        name:
          "notification-maintenance-job",

        module: "materiels",

        priority:
          "normal",

        payload:
          event.payload,
      });

      enqueueJob({
        name:
          "analytics-maintenance-job",

        module: "materiels",

        priority:
          "low",

        payload:
          event.payload,
      });'

$content = $content -replace 'console\.log\(
\s+"EVENT BUS : stock alert"
\s+\);',
'console.log(
        "EVENT BUS : stock alert"
      );

      enqueueJob({
        name:
          "notification-stock-job",

        module: "stocks",

        priority:
          "normal",

        payload:
          event.payload,
      });'

$content = $content -replace 'console\.log\(
\s+"EVENT BUS : contrat expiration"
\s+\);',
'console.log(
        "EVENT BUS : contrat expiration"
      );

      enqueueJob({
        name:
          "notification-contract-job",

        module: "contrats",

        priority:
          "normal",

        payload:
          event.payload,
      });'

Set-Content $file $content

Write-Host "=== EVENT → JOB PIPELINE connecté ===" -ForegroundColor Green