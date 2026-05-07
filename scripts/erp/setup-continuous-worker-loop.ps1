Write-Host "=== TERRAGEST_V2 - SETUP CONTINUOUS WORKER LOOP ===" -ForegroundColor Cyan

$file = "src/core/worker-loop/worker-loop.ts"

$content = Get-Content $file -Raw

$content = $content -replace 'export async function startWorkerLoop\(\) \{
\s+console\.log\(
\s+"ERP WORKER LOOP STARTED"
\s+\);

\s+const pendingJobs =
\s+getPendingJobs\(\);

\s+const prioritizedJobs =
\s+sortJobsByPriority\(
\s+pendingJobs
\s+\);

\s+for \(const job of prioritizedJobs\) \{
\s+await processJob\(job\);
\s+\}
\s+\}',
'let workerLoopRunning =
  false;

export async function startWorkerLoop() {
  if (workerLoopRunning) {
    return;
  }

  workerLoopRunning = true;

  console.log(
    "ERP WORKER LOOP STARTED"
  );

  while (workerLoopRunning) {
    const pendingJobs =
      getPendingJobs();

    const prioritizedJobs =
      sortJobsByPriority(
        pendingJobs
      );

    for (const job of prioritizedJobs) {
      await processJob(job);
    }

    await new Promise(
      (resolve) =>
        setTimeout(
          resolve,
          1000
        )
    );
  }
}

export function stopWorkerLoop() {
  workerLoopRunning =
    false;

  console.log(
    "ERP WORKER LOOP STOPPED"
  );
}'

Set-Content $file $content

Write-Host "=== CONTINUOUS WORKER LOOP activé ===" -ForegroundColor Green