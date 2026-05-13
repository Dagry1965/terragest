$ErrorActionPreference = "Stop"

$Root =
"C:\Users\Admin\terragest\src\app\(private)"

$Modules = @(
  "achats",
  "clients",
  "commandes",
  "depenses",
  "devis",
  "employes",
  "factures",
  "fournisseurs",
  "incidents",
  "intrants",
  "livraisons",
  "parcelles",
  "recettes",
  "recoltes",
  "taches",
  "vehicules"
)

function Write-Utf8File {
  param(
    [string]$Path,
    [string]$Content
  )

  $Dir = Split-Path $Path -Parent

  if (-not (Test-Path $Dir)) {
    New-Item `
      -ItemType Directory `
      -Path $Dir `
      -Force | Out-Null
  }

  [System.IO.File]::WriteAllText(
    $Path,
    $Content,
    [System.Text.Encoding]::UTF8
  )
}

foreach ($Module in $Modules) {

  Write-Host ""
  Write-Host "MODULE $Module" -ForegroundColor Cyan

  $Base =
  Join-Path $Root $Module

  Write-Utf8File `
    "$Base\page.tsx" `
@"
import { GenericListPage } from "@/components/erp/generic/GenericListPage";

export const dynamic = "force-dynamic";

export default function $(($Module.Substring(0,1).ToUpper() + $Module.Substring(1)))Page() {
  return <GenericListPage moduleKey="$Module" />;
}
"@

  Write-Utf8File `
    "$Base\nouveau\page.tsx" `
@"
import { GenericCreatePage } from "@/components/erp/generic/GenericCreatePage";

export const dynamic = "force-dynamic";

export default function Create$(($Module.Substring(0,1).ToUpper() + $Module.Substring(1)))Page() {
  return <GenericCreatePage moduleKey="$Module" />;
}
"@

  Write-Utf8File `
    "$Base\[id]\page.tsx" `
@"
import { GenericDetailPage } from "@/components/erp/generic/GenericDetailPage";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function $(($Module.Substring(0,1).ToUpper() + $Module.Substring(1)))DetailPage({
  params,
}: PageProps) {

  const { id } = await params;

  return (
    <GenericDetailPage
      moduleKey="$Module"
      id={id}
    />
  );
}
"@

  Write-Utf8File `
    "$Base\[id]\edit\page.tsx" `
@"
import { GenericEditPage } from "@/components/erp/generic/GenericEditPage";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Edit$(($Module.Substring(0,1).ToUpper() + $Module.Substring(1)))Page({
  params,
}: PageProps) {

  const { id } = await params;

  return (
    <GenericEditPage
      moduleKey="$Module"
      id={id}
    />
  );
}
"@

  Write-Host "OK $Module" -ForegroundColor Green
}

Write-Host ""
Write-Host "GENERIC ROUTES CONVERGED" -ForegroundColor Yellow