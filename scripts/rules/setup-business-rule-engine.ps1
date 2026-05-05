# ==========================================
# TERRAGEST V2
# BUSINESS RULE ENGINE SETUP
# ==========================================

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " BUSINESS RULE ENGINE SETUP "
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

$Root = Resolve-Path "."
$Src = Join-Path $Root "src"

$Rules = Join-Path `
    $Src `
    "runtime\rules"

$ReportRoot = Join-Path `
    $Root `
    "reports\rules"

# ==========================================
# HELPERS
# ==========================================

function Ensure-Directory {

    param([string]$Path)

    if (!(Test-Path $Path)) {

        New-Item `
            -ItemType Directory `
            -Path $Path `
            -Force | Out-Null

        Write-Host "CREATED : $Path" -ForegroundColor Green
    }
    else {

        Write-Host "EXISTS  : $Path" -ForegroundColor Yellow
    }
}

function Ensure-File {

    param(
        [string]$Path,
        [string]$Content
    )

    if (!(Test-Path $Path)) {

        $Content | Out-File `
            $Path `
            -Encoding UTF8

        Write-Host "CREATED : $Path" -ForegroundColor Green
    }
    else {

        Write-Host "EXISTS  : $Path" -ForegroundColor Yellow
    }
}

# ==========================================
# STRUCTURE
# ==========================================

Write-Host ""
Write-Host "Preparing business rule structure..." -ForegroundColor Cyan
Write-Host ""

Ensure-Directory $Rules
Ensure-Directory $ReportRoot

$Folders = @(
    "context",
    "decisions",
    "evaluators",
    "pipelines",
    "policies",
    "registry"
)

foreach ($Folder in $Folders) {

    Ensure-Directory `
        (Join-Path $Rules $Folder)
}

# ==========================================
# BUSINESS RULE
# ==========================================

Write-Host ""
Write-Host "Creating BusinessRule..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Rules `
        "BusinessRule.ts"
    ) `
@"
export type BusinessRule = {

  id: string;

  name: string;

  condition: string;

  action: string;

  priority: number;

  enabled: boolean;
};
"@

# ==========================================
# RULE REGISTRY
# ==========================================

Write-Host ""
Write-Host "Creating RuleRegistry..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Rules `
        "registry\RuleRegistry.ts"
    ) `
@"
import type { BusinessRule }
from "../BusinessRule";

export class RuleRegistry {

  private rules:
    BusinessRule[] = [];

  register(
    rule: BusinessRule
  ) {

    this.rules.push(rule);
  }

  getAll() {

    return this.rules;
  }
}
"@

# ==========================================
# RULE EVALUATOR
# ==========================================

Write-Host ""
Write-Host "Creating RuleEvaluator..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Rules `
        "evaluators\RuleEvaluator.ts"
    ) `
@"
import type { BusinessRule }
from "../BusinessRule";

export class RuleEvaluator {

  evaluate(
    rule: BusinessRule,
    context?: unknown
  ): boolean {

    console.log(
      "[RuleEvaluator]",
      rule.name,
      context
    );

    return true;
  }
}
"@

# ==========================================
# POLICY ENGINE
# ==========================================

Write-Host ""
Write-Host "Creating PolicyEngine..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Rules `
        "policies\PolicyEngine.ts"
    ) `
@"
import type { BusinessRule }
from "../BusinessRule";

import { RuleEvaluator }
from "../evaluators/RuleEvaluator";

export class PolicyEngine {

  private evaluator =
    new RuleEvaluator();

  execute(
    rules: BusinessRule[],
    context?: unknown
  ) {

    return rules.filter(rule =>
      this.evaluator.evaluate(
        rule,
        context
      )
    );
  }
}
"@

# ==========================================
# DECISION ENGINE
# ==========================================

Write-Host ""
Write-Host "Creating DecisionEngine..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Rules `
        "decisions\DecisionEngine.ts"
    ) `
@"
export class DecisionEngine {

  decide(
    input?: unknown
  ) {

    console.log(
      "[DecisionEngine]",
      input
    );

    return {
      approved: true,
    };
  }
}
"@

# ==========================================
# CONTEXT RESOLVER
# ==========================================

Write-Host ""
Write-Host "Creating ContextResolver..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Rules `
        "context\ContextResolver.ts"
    ) `
@"
export class ContextResolver {

  resolve(
    payload?: unknown
  ) {

    console.log(
      "[ContextResolver]",
      payload
    );

    return payload;
  }
}
"@

# ==========================================
# RULE PIPELINE
# ==========================================

Write-Host ""
Write-Host "Creating RulePipeline..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Rules `
        "pipelines\RulePipeline.ts"
    ) `
@"
import { ContextResolver }
from "../context/ContextResolver";

import { DecisionEngine }
from "../decisions/DecisionEngine";

export class RulePipeline {

  private resolver =
    new ContextResolver();

  private decisionEngine =
    new DecisionEngine();

  execute(
    payload?: unknown
  ) {

    const context =
      this.resolver.resolve(
        payload
      );

    return this.decisionEngine
      .decide(context);
  }
}
"@

# ==========================================
# MATERIAL CRITICAL RULE
# ==========================================

Write-Host ""
Write-Host "Creating material critical rule..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Rules `
        "MaterielCriticalRule.ts"
    ) `
@"
import type { BusinessRule }
from "./BusinessRule";

export const
MaterielCriticalRule:
BusinessRule = {

  id: "RULE_MAT_CRITICAL",

  name:
    "Critical Material Breakdown",

  condition:
    "severity === HIGH",

  action:
    "URGENT_MAINTENANCE",

  priority: 1,

  enabled: true,
};
"@

# ==========================================
# REPORT
# ==========================================

Write-Host ""
Write-Host "Generating rule engine report..." -ForegroundColor Cyan
Write-Host ""

$ReportFile = Join-Path `
    $ReportRoot `
    "business-rule-engine.md"

$Report = @"
# BUSINESS RULE ENGINE SETUP

Generated : $(Get-Date)

## CREATED

- BusinessRule.ts
- RuleRegistry.ts
- RuleEvaluator.ts
- PolicyEngine.ts
- DecisionEngine.ts
- ContextResolver.ts
- RulePipeline.ts
- MaterielCriticalRule.ts

## OBJECTIVE

Introduce intelligent runtime decision engine.

## FLOW

Event
→ Context
→ Rule Evaluation
→ Decision
→ Policy
→ Workflow

## STATUS

Business rule engine initialized successfully.
"@

$Report | Out-File `
    $ReportFile `
    -Encoding UTF8

# ==========================================
# DONE
# ==========================================

Write-Host ""
Write-Host "==================================================" -ForegroundColor Green
Write-Host " RULE ENGINE READY "
Write-Host "==================================================" -ForegroundColor Green
Write-Host ""

Write-Host "Report :" -ForegroundColor Yellow
Write-Host $ReportFile
Write-Host ""