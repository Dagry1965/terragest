# =========================================================
# TERRAGEST - RULE PIPELINE RUNTIME SETUP
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " RULE PIPELINE RUNTIME SETUP"
Write-Host "========================================="
Write-Host ""

# =========================================================
# DIRECTORIES
# =========================================================

$directories = @(

  ".\src\platform\rules\runtime",

  ".\src\platform\rules\monitoring",

  ".\src\platform\rules\audit",

  ".\src\platform\rules\security"
)

foreach ($directory in $directories) {

  if (!(Test-Path $directory)) {

    New-Item `
      -ItemType Directory `
      -Path $directory `
      | Out-Null

    Write-Host "[CREATED] $directory"

  } else {

    Write-Host "[EXISTS]  $directory"
  }
}

# =========================================================
# PIPELINE RULE TYPE
# =========================================================

$pipelineRule = @'
// src/platform/rules/types/PipelineRule.ts

import {
  BusinessRule
}
from "@/platform/rules/types/BusinessRule";

import { PipelineType }
from "@/platform/rules/pipelines/PipelineType";

export interface PipelineRule
extends BusinessRule {

  pipeline:
    PipelineType;
}
'@

Set-Content `
  ".\src\platform\rules\types\PipelineRule.ts" `
  $pipelineRule

Write-Host ""
Write-Host "[CREATED] PipelineRule.ts"

# =========================================================
# RULE MONITORING
# =========================================================

$ruleMonitoring = @'
// src/platform/rules/monitoring/RuleMonitoring.ts

export class RuleMonitoring {

  static started(
    rule: string
  ) {

    console.log(
      "[RULE STARTED]",
      rule
    );
  }

  static completed(
    rule: string
  ) {

    console.log(
      "[RULE COMPLETED]",
      rule
    );
  }

  static failed(

    rule: string,

    error: unknown
  ) {

    console.error(
      "[RULE FAILED]",
      rule,
      error
    );
  }
}
'@

Set-Content `
  ".\src\platform\rules\monitoring\RuleMonitoring.ts" `
  $ruleMonitoring

Write-Host "[CREATED] RuleMonitoring.ts"

# =========================================================
# RULE AUDIT
# =========================================================

$ruleAudit = @'
// src/platform/rules/audit/RuleAudit.ts

export class RuleAudit {

  static log(

    action: string,

    payload?: unknown
  ) {

    console.log(
      "[RULE AUDIT]",
      action,
      payload
    );
  }
}
'@

Set-Content `
  ".\src\platform\rules\audit\RuleAudit.ts" `
  $ruleAudit

Write-Host "[CREATED] RuleAudit.ts"

# =========================================================
# RULE SECURITY
# =========================================================

$ruleSecurity = @'
// src/platform/rules/security/RuleSecurityPolicy.ts

import {
  RuleExecutionContext
}
from "@/platform/rules/core/RuleExecutionContext";

export class RuleSecurityPolicy {

  static canExecute(
    context: RuleExecutionContext
  ) {

    if (
      context.user === "admin"
    ) {

      return true;
    }

    return true;
  }
}
'@

Set-Content `
  ".\src\platform\rules\security\RuleSecurityPolicy.ts" `
  $ruleSecurity

Write-Host "[CREATED] RuleSecurityPolicy.ts"

# =========================================================
# RULE PIPELINE RUNTIME
# =========================================================

$pipelineRuntime = @'
// src/platform/rules/runtime/RulePipelineRuntime.ts

import {
  RuleExecutionContext
}
from "@/platform/rules/core/RuleExecutionContext";

import {
  PipelineRule
}
from "@/platform/rules/types/PipelineRule";

import { PipelineType }
from "@/platform/rules/pipelines/PipelineType";

import { RuleMonitoring }
from "@/platform/rules/monitoring/RuleMonitoring";

import { RuleAudit }
from "@/platform/rules/audit/RuleAudit";

import { RuleSecurityPolicy }
from "@/platform/rules/security/RuleSecurityPolicy";

class RulePipelineRuntimeManager {

  private rules:
    PipelineRule[] = [];

  register(
    rule: PipelineRule
  ) {

    console.log(
      "[PIPELINE RULE REGISTERED]",
      rule.name
    );

    this.rules.push(rule);

    this.rules.sort(
      (a, b) =>
        (b.priority || 0)
        - (a.priority || 0)
    );
  }

  async execute(

    pipeline: PipelineType,

    context: RuleExecutionContext
  ) {

    const rules =
      this.rules.filter(
        rule =>

          rule.pipeline === pipeline
          &&

          rule.domain === context.domain
    );

    console.log(
      "[PIPELINE RUNTIME]",
      context.domain,
      pipeline,
      rules.length
    );

    for (const rule of rules) {

      const allowed =
        RuleSecurityPolicy
          .canExecute(
            context
          );

      if (!allowed) {

        continue;
      }

      try {

        RuleMonitoring.started(
          rule.name
        );

        RuleAudit.log(
          "rule.started",
          rule.name
        );

        await rule.execute(
          context
        );

        RuleMonitoring.completed(
          rule.name
        );

      } catch (error) {

        RuleMonitoring.failed(
          rule.name,
          error
        );

        RuleAudit.log(
          "rule.failed",
          rule.name
        );
      }
    }
  }
}

export const RulePipelineRuntime =
  new RulePipelineRuntimeManager();
'@

Set-Content `
  ".\src\platform\rules\runtime\RulePipelineRuntime.ts" `
  $pipelineRuntime

Write-Host "[CREATED] RulePipelineRuntime.ts"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " RULE PIPELINE RUNTIME READY"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host "pnpm build"
Write-Host "pnpm test:run"
Write-Host ""