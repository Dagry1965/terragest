param(

  [Parameter(Mandatory = $true)]

  [string]$Domain
)

# =========================================================
# TERRAGEST - DOMAIN GENERATOR
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " DOMAIN GENERATOR"
Write-Host "========================================="
Write-Host ""

$domainLower =
  $Domain.ToLower()

$domainPascal =
  (Get-Culture).TextInfo.ToTitleCase(
    $domainLower
  )

# =========================================================
# DIRECTORIES
# =========================================================

$directories = @(

  ".\src\domains\$domainLower",

  ".\src\domains\$domainLower\services",

  ".\src\domains\$domainLower\rules",

  ".\src\domains\$domainLower\workflows",

  ".\src\domains\$domainLower\events"
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
# SERVICE
# =========================================================

$service = @"
// src/domains/$domainLower/services/${domainPascal}Service.ts

import { createModuleService }
from "@/platform/factories/createModuleService";

export const ${domainPascal}Service =
  createModuleService(
    "$domainLower"
  );
"@

Set-Content `
  ".\src\domains\$domainLower\services\${domainPascal}Service.ts" `
  $service

Write-Host ""
Write-Host "[CREATED] ${domainPascal}Service.ts"

# =========================================================
# RULE
# =========================================================

$rule = @"
// src/domains/$domainLower/rules/${domainPascal}ValidationRule.ts

import { createPipelineRule }
from "@/platform/factories/createPipelineRule";

import { PipelineType }
from "@/platform/rules/pipelines/PipelineType";

export const ${domainPascal}ValidationRule =
  createPipelineRule({

    name:
      ""$domainLower-validation"",

    domain:
      ""$domainLower"",

    action:
      ""create"",

    pipeline:
      PipelineType.BEFORE_CREATE,

    priority:
      100,

    async execute(
      context
    ) {

      console.log(
        ""[RULE] $domainLower validation"",
        context.payload
      );
    }
  });
"@

Set-Content `
  ".\src\domains\$domainLower\rules\${domainPascal}ValidationRule.ts" `
  $rule

Write-Host "[CREATED] ${domainPascal}ValidationRule.ts"

# =========================================================
# REGISTER RULES
# =========================================================

$registerRules = @"
// src/domains/$domainLower/rules/register${domainPascal}Rules.ts

import { RulePipelineRuntime }
from ""@/platform/rules/runtime/RulePipelineRuntime"";

import { ${domainPascal}ValidationRule }
from ""@/domains/$domainLower/rules/${domainPascal}ValidationRule"";

export function register${domainPascal}Rules() {

  RulePipelineRuntime.register(

    ${domainPascal}ValidationRule
  );
}
"@

Set-Content `
  ".\src\domains\$domainLower\rules\register${domainPascal}Rules.ts" `
  $registerRules

Write-Host "[CREATED] register${domainPascal}Rules.ts"

# =========================================================
# WORKFLOW
# =========================================================

$workflow = @"
// src/domains/$domainLower/workflows/${domainPascal}Workflow.ts

import { WorkflowRegistry }
from ""@/platform/workflows/registry/WorkflowRegistry"";

import { WorkflowState }
from ""@/platform/workflows/states/WorkflowState"";

export function register${domainPascal}Workflow() {

  WorkflowRegistry.register(

    ""$domainLower"",

    [

      {

        from:
          WorkflowState.DRAFT,

        to:
          WorkflowState.VALIDATED
      },

      {

        from:
          WorkflowState.VALIDATED,

        to:
          WorkflowState.APPROVED
      },

      {

        from:
          WorkflowState.APPROVED,

        to:
          WorkflowState.COMPLETED
      }
    ]
  );
}
"@

Set-Content `
  ".\src\domains\$domainLower\workflows\${domainPascal}Workflow.ts" `
  $workflow

Write-Host "[CREATED] ${domainPascal}Workflow.ts"

# =========================================================
# EVENTS
# =========================================================

$events = @"
// src/domains/$domainLower/events/${domainPascal}Events.ts

export const ${domainPascal}Events = {

  CREATED:
   "$domainLower.created" ,

  UPDATED:
    "$domainLower.updated",

  DELETED:
    "$domainLower.deleted",

  VALIDATED:
    "$domainLower.validated",

  APPROVED:
    "$domainLower.approved"
};
"@

Set-Content `
  ".\src\domains\$domainLower\events\${domainPascal}Events.ts" `
  $events

Write-Host "[CREATED] ${domainPascal}Events.ts"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " DOMAIN GENERATED"
Write-Host "========================================="
Write-Host ""

Write-Host "Generated domain:"
Write-Host " - $domainLower"
Write-Host ""

Write-Host "Usage:"
Write-Host ""
Write-Host ".\scripts\generate-domain.ps1 paiement"
Write-Host ".\scripts\generate-domain.ps1 contrat"
Write-Host ".\scripts\generate-domain.ps1 maintenance"
Write-Host ""

Write-Host "Next:"
Write-Host "pnpm build"
Write-Host ""