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
# ERPDiscoveryManifest.ts
# =========================================================

$manifestPath = Join-Path `
  $root `
  "src\runtime\discovery\ERPDiscoveryManifest.ts"

$manifestContent = @'
export interface ERPDiscoveryManifest {

  modules: string[];

  dashboards: string[];

  plugins: string[];

  workspaces: string[];

  automations: string[];

  workflows: string[];
}

export const ERPDiscoveryManifestData:
  ERPDiscoveryManifest = {

  modules: [],

  dashboards: [],

  plugins: [],

  workspaces: [],

  automations: [],

  workflows: [],
};
'@

# =========================================================
# ERPModuleDiscoveryRegistry.ts
# =========================================================

$moduleRegistryPath = Join-Path `
  $root `
  "src\runtime\discovery\ERPModuleDiscoveryRegistry.ts"

$moduleRegistryContent = @'
export class ERPModuleDiscoveryRegistry {

  private static modules:
    string[] = [];

  static register(
    moduleKey: string
  ) {

    if (
      !this.modules.includes(
        moduleKey
      )
    ) {
      this.modules.push(
        moduleKey
      );
    }
  }

  static getAll():
    string[] {

    return this.modules;
  }
}
'@

# =========================================================
# ERPDashboardDiscoveryRegistry.ts
# =========================================================

$dashboardRegistryPath = Join-Path `
  $root `
  "src\runtime\discovery\ERPDashboardDiscoveryRegistry.ts"

$dashboardRegistryContent = @'
export class ERPDashboardDiscoveryRegistry {

  private static dashboards:
    string[] = [];

  static register(
    dashboardKey: string
  ) {

    if (
      !this.dashboards.includes(
        dashboardKey
      )
    ) {
      this.dashboards.push(
        dashboardKey
      );
    }
  }

  static getAll():
    string[] {

    return this.dashboards;
  }
}
'@

# =========================================================
# ERPPluginDiscoveryRegistry.ts
# =========================================================

$pluginRegistryPath = Join-Path `
  $root `
  "src\runtime\discovery\ERPPluginDiscoveryRegistry.ts"

$pluginRegistryContent = @'
export class ERPPluginDiscoveryRegistry {

  private static plugins:
    string[] = [];

  static register(
    pluginKey: string
  ) {

    if (
      !this.plugins.includes(
        pluginKey
      )
    ) {
      this.plugins.push(
        pluginKey
      );
    }
  }

  static getAll():
    string[] {

    return this.plugins;
  }
}
'@

# =========================================================
# ERPRuntimeBootstrap.ts
# =========================================================

$bootstrapPath = Join-Path `
  $root `
  "src\runtime\bootstrap\ERPRuntimeBootstrap.ts"

$bootstrapContent = @'
import {
  ERPDiscoveryManifestData,
} from "@/runtime/discovery/ERPDiscoveryManifest";

import {
  ERPModuleDiscoveryRegistry,
} from "@/runtime/discovery/ERPModuleDiscoveryRegistry";

import {
  ERPDashboardDiscoveryRegistry,
} from "@/runtime/discovery/ERPDashboardDiscoveryRegistry";

import {
  ERPPluginDiscoveryRegistry,
} from "@/runtime/discovery/ERPPluginDiscoveryRegistry";

export class ERPRuntimeBootstrap {

  static bootstrap() {

    ERPDiscoveryManifestData.modules.forEach(
      (moduleKey) => {

        ERPModuleDiscoveryRegistry.register(
          moduleKey
        );
      }
    );

    ERPDiscoveryManifestData.dashboards.forEach(
      (dashboardKey) => {

        ERPDashboardDiscoveryRegistry.register(
          dashboardKey
        );
      }
    );

    ERPDiscoveryManifestData.plugins.forEach(
      (pluginKey) => {

        ERPPluginDiscoveryRegistry.register(
          pluginKey
        );
      }
    );
  }
}
'@

Write-Utf8NoBom `
  -Path $manifestPath `
  -Content $manifestContent

Write-Utf8NoBom `
  -Path $moduleRegistryPath `
  -Content $moduleRegistryContent

Write-Utf8NoBom `
  -Path $dashboardRegistryPath `
  -Content $dashboardRegistryContent

Write-Utf8NoBom `
  -Path $pluginRegistryPath `
  -Content $pluginRegistryContent

Write-Utf8NoBom `
  -Path $bootstrapPath `
  -Content $bootstrapContent

Write-Host ""
Write-Host "OK - ERP Runtime Discovery Foundation installed."
Write-Host "Run: pnpm build"