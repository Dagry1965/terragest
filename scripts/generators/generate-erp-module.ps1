param(
  [Parameter(Mandatory = $true)]
  [string]$Module
)

$ErrorActionPreference = "Stop"

$root =
  "C:\Users\Admin\terragest"

$moduleLower =
  $Module.ToLower()

$modulePascal =
  (Get-Culture).TextInfo.ToTitleCase(
    $moduleLower
  )

function Ensure-Dir {
  param([string]$Path)

  New-Item `
    -ItemType Directory `
    -Force `
    -Path $Path | Out-Null
}

function Write-File {
  param(
    [string]$Path,
    [string]$Content
  )

  [System.IO.File]::WriteAllText(
    $Path,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host "OK -> $Path"
}

# =====================================================
# STRUCTURE
# =====================================================

$paths = @(
  "src/app/(private)/$moduleLower",
  "src/app/(private)/$moduleLower/nouveau",
  "src/app/(private)/$moduleLower/[id]",
  "src/app/(private)/$moduleLower/[id]/edit",

  "src/features/$moduleLower",

  "src/domains/$moduleLower",

  "src/runtime/modules/generated/$moduleLower",

  "src/runtime/workflows/generated/$moduleLower",

  "src/runtime/policies/generated/$moduleLower",

  "src/runtime/firestore/generated/$moduleLower",

  "src/runtime/observability/generated/$moduleLower",

  "src/runtime/tests/generated/$moduleLower"
)

foreach ($path in $paths) {
  Ensure-Dir (
    Join-Path $root $path
  )
}

# =====================================================
# FEATURE
# =====================================================

$feature = @"
import type {
  FeatureDefinition
}
from "@/platform/registry/FeatureDefinition";

export const ${modulePascal}Feature:
  FeatureDefinition = {

  name:
    "$moduleLower",

  label:
    "$modulePascal",

  enabled:
    true,

  version:
    "1.0.0",

  route:
    "/$moduleLower",

  capabilities: [
    "crud",
    "runtime",
    "workflow",
    "rules",
    "automation",
    "observability",
    "realtime",
    "analytics"
  ],

  dependencies: [],
};
"@

Write-File `
  (Join-Path $root "src/features/$moduleLower/$moduleLower.feature.ts") `
  $feature

# =====================================================
# PAGE
# =====================================================

$page = @"
import {
  GenericListPage
}
from "@/components/erp/generic/GenericListPage";

export default function ${modulePascal}Page() {

  return (

    <GenericListPage
      module="$moduleLower"
    />
  );
}
"@

Write-File `
  (Join-Path $root "src/app/(private)/$moduleLower/page.tsx") `
  $page

# =====================================================
# CREATE PAGE
# =====================================================

$createPage = @"
import {
  GenericCreatePage
}
from "@/components/erp/generic/GenericCreatePage";

export default function Create${modulePascal}Page() {

  return (

    <GenericCreatePage
      module="$moduleLower"
    />
  );
}
"@

Write-File `
  (Join-Path $root "src/app/(private)/$moduleLower/nouveau/page.tsx") `
  $createPage

# =====================================================
# DETAIL PAGE
# =====================================================

$detailPage = @"
import {
  GenericDetailPage
}
from "@/components/erp/generic/GenericDetailPage";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ${modulePascal}DetailPage({
  params,
}: Props) {

  const { id } =
    await params;

  return (

    <GenericDetailPage
      module="$moduleLower"
      id={id}
    />
  );
}
"@

Write-File `
  (Join-Path $root "src/app/(private)/$moduleLower/[id]/page.tsx") `
  $detailPage

# =====================================================
# EDIT PAGE
# =====================================================

$editPage = @"
import {
  GenericEditPage
}
from "@/components/erp/generic/GenericEditPage";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Edit${modulePascal}Page({
  params,
}: Props) {

  const { id } =
    await params;

  return (

    <GenericEditPage
      module="$moduleLower"
      id={id}
    />
  );
}
"@

Write-File `
  (Join-Path $root "src/app/(private)/$moduleLower/[id]/edit/page.tsx") `
  $editPage

# =====================================================
# WORKFLOW
# =====================================================

$workflow = @"
export const ${modulePascal}Workflow = {

  key:
    "${moduleLower}_workflow",

  label:
    "$modulePascal Workflow",

  states: [
    "draft",
    "active",
    "validated",
    "archived"
  ],
};
"@

Write-File `
  (Join-Path $root "src/runtime/workflows/generated/$moduleLower/$moduleLower.workflow.ts") `
  $workflow

# =====================================================
# POLICY
# =====================================================

$policy = @"
export const ${modulePascal}Policy = {

  module:
    "$moduleLower",

  permissions: [
    "create",
    "read",
    "update",
    "delete",
    "audit",
    "workflow"
  ],
};
"@

Write-File `
  (Join-Path $root "src/runtime/policies/generated/$moduleLower/$moduleLower.policy.ts") `
  $policy

# =====================================================
# OBSERVABILITY
# =====================================================

$observability = @"
export const ${modulePascal}Observability = {

  module:
    "$moduleLower",

  metrics: true,

  tracing: true,

  audit: true,

  monitoring: true,
};
"@

Write-File `
  (Join-Path $root "src/runtime/observability/generated/$moduleLower/$moduleLower.observability.ts") `
  $observability

Write-Host ""
Write-Host "======================================"
Write-Host "ERP MODULE GENERATED:"
Write-Host $modulePascal
Write-Host "======================================"