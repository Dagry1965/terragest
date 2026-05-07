Write-Host "=== TERRAGEST_V2 - CONNECT METRICS PIPELINE ===" -ForegroundColor Cyan

# =====================================================
# WORKER LOOP
# =====================================================

$workerLoop =
  "src/core/worker-loop/worker-loop.ts"

$workerContent =
  Get-Content $workerLoop -Raw

$workerContent =
  $workerContent -replace 'import \{
\s+pushRuntimeEntry,
\s+\} from "@\/core\/runtime\/runtime-timeline";',
'import {
  pushRuntimeEntry,
} from "@/core/runtime/runtime-timeline";

import {
  incrementMetric,
} from "@/core/metrics/metrics-engine";'

$workerContent =
  $workerContent -replace 'job.status =
\s+"completed";',
'job.status =
      "completed";

    incrementMetric(
      "processedJobs"
    );'

Set-Content `
  $workerLoop `
  $workerContent

# =====================================================
# RETRY ENGINE
# =====================================================

$retryFile =
  "src/core/retry/retry-engine.ts"

$retryContent =
  Get-Content $retryFile -Raw

$retryContent =
  $retryContent -replace 'import \{
\s+pushRuntimeEntry,
\s+\} from "@\/core\/runtime\/runtime-timeline";',
'import {
  pushRuntimeEntry,
} from "@/core/runtime/runtime-timeline";

import {
  incrementMetric,
} from "@/core/metrics/metrics-engine";'

$retryContent =
  $retryContent -replace 'job\.retries \+= 1;',
'job.retries += 1;

  incrementMetric(
    "retriedJobs"
  );'

$retryContent =
  $retryContent -replace 'job\.status = "failed";',
'job.status = "failed";

    incrementMetric(
      "failedJobs"
    );

    incrementMetric(
      "deadJobs"
    );'

Set-Content `
  $retryFile `
  $retryContent

# =====================================================
# EVENT BUS
# =====================================================

$eventBus =
  "src/core/event-bus/event-bus.ts"

$eventContent =
  Get-Content $eventBus -Raw

$eventContent =
  $eventContent -replace 'const handlers =',
'incrementMetric(
    "runtimeEvents"
  );

  const handlers ='

$eventContent =
  $eventContent -replace 'export type ERPEvent =',
'import {
  incrementMetric,
} from "@/core/metrics/metrics-engine";

export type ERPEvent ='

Set-Content `
  $eventBus `
  $eventContent

# =====================================================
# WORKFLOW WORKER
# =====================================================

$workflowWorker =
  "src/core/workers/workflow-worker.ts"

$workflowContent =
  Get-Content $workflowWorker -Raw

$workflowContent =
  $workflowContent -replace 'import \{
\s+pushRuntimeEntry,
\s+\} from "@\/core\/runtime\/runtime-timeline";',
'import {
  pushRuntimeEntry,
} from "@/core/runtime/runtime-timeline";

import {
  incrementMetric,
} from "@/core/metrics/metrics-engine";'

$workflowContent =
  $workflowContent -replace 'console\.log\(
\s+"WORKFLOW WORKER",
\s+job
\s+\);',
'incrementMetric(
    "workflowExecutions"
  );

  console.log(
    "WORKFLOW WORKER",
    job
  );'

Set-Content `
  $workflowWorker `
  $workflowContent

Write-Host "=== METRICS PIPELINE connecté ===" -ForegroundColor Green