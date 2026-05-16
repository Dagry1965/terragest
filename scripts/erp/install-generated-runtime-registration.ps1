$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"

function Write-Utf8NoBom {
  param(
    [string]$Path,
    [string]$Content
  )

  $dir = Split-Path $Path -Parent

  if (!(Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
  }

  [System.IO.File]::WriteAllText(
    $Path,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host "WRITTEN $Path"
}

# =========================================================
# GeneratedRuntimeManifest.ts
# =========================================================

$generatedManifestPath = Join-Path `
  $root `
  "src\runtime\generation\GeneratedRuntimeManifest.ts"

$generatedManifestContent = @'
export interface GeneratedRuntimeManifest {

  modules: string[];

  dashboards: string[];

  plugins: string[];
}

export const generatedRuntimeManifest:
  GeneratedRuntimeManifest = {

  modules: [
    "contrats",
    "facturations",
    "campagnes",
    "budgets",
  ],

  dashboards: [
    "business-dashboard",
  ],

  plugins: [],
};
'@

# =========================================================
# registerGeneratedRuntime.ts
# =========================================================

$registerPath = Join-Path `
  $root `
  "src\runtime\generation\registerGeneratedRuntime.ts"

$registerContent = @'
import {
  ERPDiscoveryManifestData,
} from "@/runtime/discovery/ERPDiscoveryManifest";

import {
  generatedRuntimeManifest,
} from "./GeneratedRuntimeManifest";

export function registerGeneratedRuntime() {

  ERPDiscoveryManifestData.modules.push(
    ...generatedRuntimeManifest.modules
  );

  ERPDiscoveryManifestData.dashboards.push(
    ...generatedRuntimeManifest.dashboards
  );

  ERPDiscoveryManifestData.plugins.push(
    ...generatedRuntimeManifest.plugins
  );
}
'@

# =========================================================
# PATCH ERPRuntimeBootstrap
# =========================================================

$bootstrapPath = Join-Path `
  $root `
  "src\runtime\bootstrap\ERPRuntimeBootstrap.ts"

$content = Get-Content $bootstrapPath -Raw

$content = $content.Replace(
'import {
  ERPPluginDiscoveryRegistry,
} from "@/runtime/discovery/ERPPluginDiscoveryRegistry";',
'import {
  ERPPluginDiscoveryRegistry,
} from "@/runtime/discovery/ERPPluginDiscoveryRegistry";

import {
  registerGeneratedRuntime,
} from "@/runtime/generation/registerGeneratedRuntime";'
)

$content = $content.Replace(
'  static bootstrap() {',
'  static bootstrap() {

    registerGeneratedRuntime();'
)

Write-Utf8NoBom `
  -Path $generatedManifestPath `
  -Content $generatedManifestContent

Write-Utf8NoBom `
  -Path $registerPath `
  -Content $registerContent

Write-Utf8NoBom `
  -Path $bootstrapPath `
  -Content $content

Write-Host ""
Write-Host "OK - Generated Runtime Registration installed."
Write-Host "Run: pnpm build"S
