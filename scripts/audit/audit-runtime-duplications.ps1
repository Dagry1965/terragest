$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"
$outDir = Join-Path $root "docs\audit"
$outFile = Join-Path $outDir "runtime-duplications-audit.md"

New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$targets = @(
  @{
    Name = "Queue Engines"
    Patterns = @(
      "QueueStore",
      "WorkflowQueue",
      "AutomationRuntimeQueue",
      "RuntimeQueueRegistry",
      "ERPQueueStore",
      "enqueueJob",
      "jobQueue"
    )
  },
  @{
    Name = "Retry Engines"
    Patterns = @(
      "RetryEngine",
      "RetryPolicy",
      "runtimeRetryRegistry",
      "retryJob",
      "computeRetryDelay"
    )
  },
  @{
    Name = "Dead Letter Queues"
    Patterns = @(
      "DeadLetterQueue",
      "RuntimeDeadLetterQueue",
      "ERPDeadLetterStore",
      "deadLetter",
      "DLQ"
    )
  },
  @{
    Name = "Policy Engines"
    Patterns = @(
      "PolicyEngine",
      "RuntimePolicyEngine",
      "ERPPolicyEngine",
      "PolicyRegistry",
      "ExecutionPolicy",
      "SecurityPolicy"
    )
  },
  @{
    Name = "Tenant Engines"
    Patterns = @(
      "TenantRegistry",
      "ERPTenantRegistry",
      "TenantContext",
      "ERPTenantContext",
      "TenantManager",
      "TenantService",
      "tenantId"
    )
  },
  @{
    Name = "Governance Engines"
    Patterns = @(
      "GovernanceRuntime",
      "EnterpriseRuntimeGovernance",
      "GovernanceEngine",
      "EnterpriseGovernanceEngine",
      "RuntimePoliciesEngine"
    )
  }
)

$files =
  Get-ChildItem (Join-Path $root "src") -Recurse -Include *.ts,*.tsx

$lines = @()
$lines += "# Terragest_V2 - Runtime Duplications Audit"
$lines += ""
$lines += "Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
$lines += ""
$lines += "Files scanned: $($files.Count)"
$lines += ""

foreach ($target in $targets) {
  $lines += "## $($target.Name)"
  $lines += ""

  foreach ($pattern in $target.Patterns) {
    $matches =
      $files |
      Select-String -SimpleMatch -Pattern $pattern

    $lines += "### Pattern: $pattern"
    $lines += ""
    $lines += "Matches: $($matches.Count)"
    $lines += ""

    foreach ($match in $matches) {
      $relative =
        $match.Path.Replace($root + "\", "")

      $safeLine =
        $match.Line.Trim()

      $lines += "- `${relative}:$($match.LineNumber)` $safeLine"
    }

    $lines += ""
  }
}

[System.IO.File]::WriteAllLines(
  $outFile,
  $lines,
  [System.Text.UTF8Encoding]::new($false)
)

Write-Host "OK - audit generated:"
Write-Host $outFile