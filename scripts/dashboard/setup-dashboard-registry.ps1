$ErrorActionPreference = "Stop"

$Root =
"C:\Users\Admin\terragest"

function Ensure-Dir($Path) {

  if (!(Test-Path $Path)) {

    New-Item `
      -ItemType Directory `
      -Path $Path `
      -Force | Out-Null
  }
}

function Write-File(
  $Path,
  $Content
) {

  $Dir =
    Split-Path $Path -Parent

  Ensure-Dir $Dir

  [System.IO.File]::WriteAllText(
    $Path,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host "WRITTEN $Path"
}

Ensure-Dir `
"$Root\src\runtime\dashboard\generic\registry"

Ensure-Dir `
"$Root\src\runtime\dashboard\generic\configs"

$Registry = @'
import type {
  ERPDashboardConfig,
}
from "../ERPDashboardTypes";

export class ERPDashboardRegistry {

  private static dashboards:
    Record<
      string,
      ERPDashboardConfig
    > = {};

  static register(
    dashboard:
      ERPDashboardConfig
  ) {

    this.dashboards[
      dashboard.key
    ] = dashboard;
  }

  static get(
    key: string
  ):
    ERPDashboardConfig | null {

    return (
      this.dashboards[key]
      ?? null
    );
  }

  static getAll():
    ERPDashboardConfig[] {

    return Object.values(
      this.dashboards
    );
  }
}
'@

$Loader = @'
import {
  ERPDashboardRegistry,
}
from "./registry/ERPDashboardRegistry";

import {
  ERPBusinessDashboardConfig,
}
from "./configs/ERPBusinessDashboardConfig";

export function registerERPDashboards() {

  ERPDashboardRegistry.register(
    ERPBusinessDashboardConfig
  );
}
'@

$BusinessConfig = @'
import type {
  ERPDashboardConfig,
}
from "../ERPDashboardTypes";

export const ERPBusinessDashboardConfig:
  ERPDashboardConfig = {

  key:
    "business-dashboard",

  title:
    "Cockpit TerraGest",

  subtitle:
    "Pilotage opérationnel ERP.",

  widgets: [

    {
      key:
        "terrains-total",

      type:
        "kpi",

      moduleKey:
        "terrains",

      title:
        "Terrains",
    },

    {
      key:
        "exploitations-total",

      type:
        "kpi",

      moduleKey:
        "exploitations",

      title:
        "Exploitations",
    },

    {
      key:
        "contrats-actifs",

      type:
        "kpi",

      moduleKey:
        "contrats",

      title:
        "Contrats actifs",

      filters: [
        {
          field:
            "statutContrat",

          operator:
            "equals",

          value:
            "Actif",
        },
      ],
    },

    {
      key:
        "campagnes-actives",

      type:
        "kpi",

      moduleKey:
        "campagnes",

      title:
        "Campagnes actives",

      filters: [
        {
          field:
            "statutCampagne",

          operator:
            "equals",

          value:
            "En cours",
        },
      ],
    },

    {
      key:
        "stocks-critiques",

      type:
        "alert",

      moduleKey:
        "stocks",

      title:
        "Stocks critiques",

      filters: [
        {
          field:
            "statutStock",

          operator:
            "equals",

          value:
            "Bas",
        },
      ],
    },

    {
      key:
        "timeline-campagnes",

      type:
        "timeline",

      moduleKey:
        "campagnes",

      title:
        "Timeline campagnes",

      dateField:
        "dateFinPrevue",
    },
  ],
};
'@

Write-File `
"$Root\src\runtime\dashboard\generic\registry\ERPDashboardRegistry.ts" `
$Registry

Write-File `
"$Root\src\runtime\dashboard\generic\registerERPDashboards.ts" `
$Loader

Write-File `
"$Root\src\runtime\dashboard\generic\configs\ERPBusinessDashboardConfig.ts" `
$BusinessConfig

Write-Host ""
Write-Host "DONE DASHBOARD REGISTRY"
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. remplacer ancien config path"
Write-Host "2. pnpm build"