param(
  [Parameter(Mandatory = $true)]
  [string]$ModuleKey,

  [Parameter(Mandatory = $true)]
  [string]$Label,

  [string]$Category,

  [string]$Icon
)

$ErrorActionPreference = "Stop"

if (-not $Category) {
  $Category = "Metier"
}

if (-not $Icon) {
  $Icon = "box"
}

$Root = "C:\Users\Admin\terragest"

function Write-FileUtf8($Path, $Content) {
  $Dir = Split-Path $Path -Parent

  if (-not (Test-Path $Dir)) {
    New-Item -ItemType Directory -Path $Dir -Force | Out-Null
  }

  [System.IO.File]::WriteAllText(
    $Path,
    $Content,
    [System.Text.Encoding]::UTF8
  )

  Write-Host "WRITTEN $Path" -ForegroundColor Green
}

$PascalName =
  ($ModuleKey -split "[-_]") |
  ForEach-Object {
    $_.Substring(0,1).ToUpper() + $_.Substring(1)
  }

$PascalName = $PascalName -join ""

$ExportName = "$($ModuleKey)ModuleV2"

$ModuleFile = "$Root\src\runtime\modules\v2\$($ModuleKey)ModuleV2.ts"
$DocFile = "$Root\docs\business-model\v2\modules\$($ModuleKey).md"
$SeedFile = "$Root\src\seeds\v2\$($ModuleKey)SeedV2.ts"
$ModelFile = "$Root\src\runtime\modules\v2\terragestBusinessModelV2.ts"

$ModuleContent = @"
import type { ERPModule } from "@/runtime/modules";

export const ${ExportName}: ERPModule = {
  metadata: {
    key: "$ModuleKey",
    label: "$Label",
    description: "Module métier $Label généré par le standard ERP Business Module V2.",
    icon: "$Icon",
    category: "$Category",
features: {
  audit: true,
  realtime: true,
  analytics: true,
  workflows: true,
  automation: true,
  notifications: true,
},

dashboard: true,


  },

  schema: {
    collection: "$ModuleKey",
    fields: [
      {
        key: "nom",
        label: "Nom",
        type: "text",
        required: true,
      },
      {
        key: "description",
        label: "Description",
        type: "textarea",
      },
      {
        key: "statut",
        label: "Statut",
        type: "select",
        options: [
          { label: "Actif", value: "actif" },
          { label: "Inactif", value: "inactif" },
          { label: "Archive", value: "archive" },
        ],
      },
    ],
  },
};
"@

$DocContent = @"
# Module $Label — V2

## Identité

- Module key : $ModuleKey
- Label : $Label
- Catégorie : $Category
- Icône : $Icon

## Objectif

Ce module est généré selon le standard ERP Business Module V2 de Terragest.

## Capacités enterprise

- Audit
- Realtime
- Analytics
- Workflows
- Automation
- Notifications

## Convention

Ce module doit rester runtime-first, schema-driven et metadata-driven.
"@

$SeedContent = @"
export const ${ModuleKey}SeedV2 = [
  {
    nom: "$Label exemple",
    description: "Donnée de test générée.",
    statut: "actif",
  },
];
"@

Write-FileUtf8 $ModuleFile $ModuleContent
Write-FileUtf8 $DocFile $DocContent
Write-FileUtf8 $SeedFile $SeedContent

# ======================================================
# AUTO REGISTRATION DANS terragestBusinessModelV2.ts
# ======================================================

if (Test-Path $ModelFile) {
  $ModelContent = [System.IO.File]::ReadAllText($ModelFile)

  $ImportLine = "import { $ExportName } from `"./$($ModuleKey)ModuleV2`";"

  if ($ModelContent -notlike "*$ImportLine*") {
    $ModelContent = $ModelContent -replace `
      'import type \{ ERPModule \} from "@/runtime/modules";', `
      "import type { ERPModule } from `"@/runtime/modules`";`r`n$ImportLine"

    Write-Host "REGISTERED import $ExportName" -ForegroundColor Yellow
  }

  if ($ModelContent -notlike "*$ExportName,*") {
    $ModelContent = $ModelContent -replace `
      '\];\s*$', `
      "  $ExportName,`r`n];"

    Write-Host "REGISTERED module $ExportName" -ForegroundColor Yellow
  }

  [System.IO.File]::WriteAllText(
    $ModelFile,
    $ModelContent,
    [System.Text.Encoding]::UTF8
  )
}

# ======================================================
# RUNTIME ROUTES GENERATION
# ======================================================

$AppRoot =
  "$Root\src\app\(private)\$ModuleKey"

$ListPage = @"
import { GenericListPage }
from "@/components/erp/generic/GenericListPage";

export const dynamic = "force-dynamic";

export default function ${PascalName}Page() {
  return (
    <GenericListPage moduleKey="$ModuleKey" />
  );
}
"@

$CreatePage = @"
import { GenericCreatePage }
from "@/components/erp/generic/GenericCreatePage";

export const dynamic = "force-dynamic";

export default function Create${PascalName}Page() {
  return (
    <GenericCreatePage moduleKey="$ModuleKey" />
  );
}
"@

$DetailPage = @"
import { GenericDetailPage }
from "@/components/erp/generic/GenericDetailPage";

export const dynamic = "force-dynamic";

export default async function ${PascalName}DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  return (
    <GenericDetailPage
      moduleKey="$ModuleKey"
      id={id}
    />
  );
}
"@

$EditPage = @"
import { GenericEditPage }
from "@/components/erp/generic/GenericEditPage";

export const dynamic = "force-dynamic";

export default async function Edit${PascalName}Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  return (
    <GenericEditPage
      moduleKey="$ModuleKey"
      id={id}
    />
  );
}
"@

Write-FileUtf8 `
"$AppRoot\page.tsx" `
$ListPage

Write-FileUtf8 `
"$AppRoot\nouveau\page.tsx" `
$CreatePage

Write-FileUtf8 `
"$AppRoot\[id]\page.tsx" `
$DetailPage

Write-FileUtf8 `
"$AppRoot\[id]\edit\page.tsx" `
$EditPage

Write-Host ""
Write-Host "RUNTIME ROUTES GENERATED" `
  -ForegroundColor Green


Write-Host ""
Write-Host "===================================" -ForegroundColor Cyan
Write-Host "BUSINESS MODULE V2 GENERATED + REGISTERED" -ForegroundColor Green
Write-Host "===================================" -ForegroundColor Cyan
Write-Host "Module : $ModuleKey"
Write-Host "Export : $ExportName"