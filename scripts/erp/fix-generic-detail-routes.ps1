Write-Host "=== FIX GENERIC DETAIL ROUTES V3 ===" -ForegroundColor Cyan

$root = (Get-Location).Path

$routes = @(
  @{
    Dir = "$root\src\app\(private)\exploitations\[id]"
    Module = "exploitations"
    Name = "ExploitationDetailPage"
  },
  @{
    Dir = "$root\src\app\(private)\terrains\[id]"
    Module = "terrains"
    Name = "TerrainDetailPage"
  },
  @{
    Dir = "$root\src\app\(private)\materiels\[id]"
    Module = "materiels"
    Name = "MaterielDetailPage"
  }
)

foreach ($route in $routes) {
  [System.IO.Directory]::CreateDirectory($route.Dir) | Out-Null

  $content = @"
import { GenericDetailPage } from "@/components/erp/generic/GenericDetailPage";

type Props = {
  params: {
    id: string;
  };
};

export default function $($route.Name)({
  params,
}: Props) {
  return (
    <GenericDetailPage
      moduleKey="$($route.Module)"
      id={params.id}
    />
  );
}
"@

  [System.IO.File]::WriteAllText(
    "$($route.Dir)\page.tsx",
    $content,
    [System.Text.Encoding]::UTF8
  )

  Write-Host "OK route détail: $($route.Module)" -ForegroundColor Green
}

Write-Host "Routes détail ERP corrigées." -ForegroundColor Green