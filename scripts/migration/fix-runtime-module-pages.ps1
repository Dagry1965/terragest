$modules = @(
  "depenses",
  "factures",
  "devis",
  "livraisons",
  "employes",
  "taches",
  "incidents",
  "vehicules",
  "parcelles",
  "recoltes",
  "intrants",
  "recettes"
)

foreach ($module in $modules) {

  $pascal =
    ($module.Substring(0,1).ToUpper() + $module.Substring(1))

  Write-Host ""
  Write-Host "================================="
  Write-Host "MODULE : $module"
  Write-Host "================================="

  $basePath =
    ".\src\app\(private)\$module"

  #
  # LIST
  #

  $listContent = @"
import { notFound } from "next/navigation";

import { GenericListPage }
from "@/components/erp/generic/GenericListPage";

import { coreERPModules }
from "@/runtime/modules/definitions/coreModules";

export default function ${pascal}Page() {

  const module = coreERPModules.find(
    (m) => m.metadata.key === "$module"
  );

  if (!module) {
    notFound();
  }

  return (
    <GenericListPage
      module={module}
    />
  );
}
"@

  [System.IO.File]::WriteAllText(
    "$basePath\page.tsx",
    $listContent,
    [System.Text.UTF8Encoding]::new($false)
  )

  #
  # CREATE
  #

  $createContent = @"
import { notFound } from "next/navigation";

import { GenericCreatePage }
from "@/components/erp/generic/GenericCreatePage";

import { coreERPModules }
from "@/runtime/modules/definitions/coreModules";

export default function ${pascal}CreatePage() {

  const module = coreERPModules.find(
    (m) => m.metadata.key === "$module"
  );

  if (!module) {
    notFound();
  }

  return (
    <GenericCreatePage
      module={module}
    />
  );
}
"@

  [System.IO.File]::WriteAllText(
    "$basePath\nouveau\page.tsx",
    $createContent,
    [System.Text.UTF8Encoding]::new($false)
  )

  #
  # DETAIL
  #

  $detailContent = @"
import { notFound } from "next/navigation";

import { GenericDetailPage }
from "@/components/erp/generic/GenericDetailPage";

import { coreERPModules }
from "@/runtime/modules/definitions/coreModules";

export default async function ${pascal}DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const module = coreERPModules.find(
    (m) => m.metadata.key === "$module"
  );

  if (!module) {
    notFound();
  }

  return (
    <GenericDetailPage
      module={module}
      id={id}
    />
  );
}
"@

  [System.IO.File]::WriteAllText(
    "$basePath\[id]\page.tsx",
    $detailContent,
    [System.Text.UTF8Encoding]::new($false)
  )

  #
  # EDIT
  #

  $editContent = @"
import { notFound } from "next/navigation";

import { GenericEditPage }
from "@/components/erp/generic/GenericEditPage";

import { coreERPModules }
from "@/runtime/modules/definitions/coreModules";

export default async function ${pascal}EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const module = coreERPModules.find(
    (m) => m.metadata.key === "$module"
  );

  if (!module) {
    notFound();
  }

  return (
    <GenericEditPage
      module={module}
      id={id}
    />
  );
}
"@

  [System.IO.File]::WriteAllText(
    "$basePath\[id]\edit\page.tsx",
    $editContent,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host "OK -> $module"
}

Write-Host ""
Write-Host "================================="
Write-Host "MIGRATION TERMINEE"
Write-Host "================================="