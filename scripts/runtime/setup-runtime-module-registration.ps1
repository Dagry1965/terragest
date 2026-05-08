$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

$GeneratedRoot =
  Join-Path `
    $ProjectRoot `
    "src\runtime\generated"

New-Item `
  -ItemType Directory `
  -Force `
  -Path $GeneratedRoot | Out-Null

$Modules = @(
  "terrains",
  "exploitations",
  "stocks",
  "contrats",
  "maintenance",
  "interventions",
  "materiels",
  "paiements"
)

$GeneratedModules = @()

foreach ($module in $Modules) {

  $GeneratedModules += @"
{
  id: "$module",
  label: "$module",
  domain: "$module",
  version: "1.0.0",
  status: "active",
  capabilities: [
    "workflow",
    "automation",
    "audit",
    "permissions",
    "states",
    "relations",
    "observability",
    "realtime"
  ],
  events: [],
  workflows: [],
  permissions: [],
  states: [],
  relations: []
}
"@
}

$Content = @"
import type {
  RuntimeModuleContract,
} from "../core/RuntimeContracts";

export const GeneratedRuntimeModules:
RuntimeModuleContract[] = [

$($GeneratedModules -join ",`r`n")

];
"@

Set-Content `
  -LiteralPath (
    Join-Path `
      $GeneratedRoot `
      "GeneratedRuntimeModules.ts"
  ) `
  -Value $Content `
  -Encoding UTF8

Write-Host ""
Write-Host "Runtime modules generated." `
  -ForegroundColor Green

Write-Host ""