$ErrorActionPreference = "Stop"

$Root = "C:\Users\Admin\terragest"
$Base = "$Root\src\app\(private)\achats"

$Files = @{
  "page.tsx" = @'
import { GenericListPage } from "@/components/erp/generic/GenericListPage";

export const dynamic = "force-dynamic";

export default function AchatsPage() {
  return <GenericListPage moduleKey="achats" />;
}
'@

  "nouveau\page.tsx" = @'
import { GenericCreatePage } from "@/components/erp/generic/GenericCreatePage";

export const dynamic = "force-dynamic";

export default function CreateAchatsPage() {
  return <GenericCreatePage moduleKey="achats" />;
}
'@

  "[id]\page.tsx" = @'
import { GenericDetailPage } from "@/components/erp/generic/GenericDetailPage";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AchatsDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  return (
    <GenericDetailPage
      moduleKey="achats"
      id={id}
    />
  );
}
'@

  "[id]\edit\page.tsx" = @'
import { GenericEditPage } from "@/components/erp/generic/GenericEditPage";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditAchatsPage({
  params,
}: PageProps) {
  const { id } = await params;

  return (
    <GenericEditPage
      moduleKey="achats"
      id={id}
    />
  );
}
'@
}

foreach ($RelativePath in $Files.Keys) {
  $Path = Join-Path $Base $RelativePath
  $Dir = Split-Path $Path -Parent

  if (-not (Test-Path $Dir)) {
    New-Item -ItemType Directory -Path $Dir -Force | Out-Null
  }

  [System.IO.File]::WriteAllText(
    $Path,
    $Files[$RelativePath],
    [System.Text.Encoding]::UTF8
  )

  Write-Host "UPDATED $Path" -ForegroundColor Green
}

Write-Host "Done. Run pnpm build." -ForegroundColor Cyan