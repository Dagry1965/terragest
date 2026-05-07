Write-Host "=== FIX GENERIC EDIT ROUTES ===" -ForegroundColor Cyan

$root = (Get-Location).Path

$routes = @(
  @{
    Dir = "$root\src\app\(private)\exploitations\[id]\edit"
    Module = "exploitations"
    Name = "ExploitationEditPage"
  },
  @{
    Dir = "$root\src\app\(private)\terrains\[id]\edit"
    Module = "terrains"
    Name = "TerrainEditPage"
  },
  @{
    Dir = "$root\src\app\(private)\materiels\[id]\edit"
    Module = "materiels"
    Name = "MaterielEditPage"
  }
)

foreach ($route in $routes) {
  [System.IO.Directory]::CreateDirectory($route.Dir) | Out-Null

  $content = @"
import { GenericEditPage } from "@/components/erp/generic/GenericEditPage";

type Props = {
  params: {
    id: string;
  };
};

export default function $($route.Name)({
  params,
}: Props) {
  return (
    <GenericEditPage
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

  Write-Host "OK route edit: $($route.Module)" -ForegroundColor Green
}

Write-Host "Routes edit ERP corrigées." -ForegroundColor Green