$ErrorActionPreference = "Stop"

$Root = "C:\Users\Admin\terragest"

function Write-File($Path, $Content) {
  $Dir = Split-Path $Path -Parent
  if (!(Test-Path $Dir)) {
    New-Item -ItemType Directory -Path $Dir -Force | Out-Null
  }

  [System.IO.File]::WriteAllText(
    $Path,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host "WRITTEN $Path"
}

$Path = "$Root\src\runtime\dashboard\ERPBusinessMetricsEngine.ts"

$Content = @'
import type {
  ERPBusinessDashboardMetrics,
}
from "./ERPDashboardMetrics";

import { RuntimeDataBinding }
from "@/runtime/data-binding";

import {
  coreERPModules,
}
from "@/runtime/modules/definitions/coreModules";

import type {
  ERPModule,
}
from "@/runtime/modules";

function getModule(moduleKey: string): ERPModule | null {

  return (
    coreERPModules.find(
      (module) =>
        module.metadata.key === moduleKey
    ) ?? null
  );
}

async function listModule(moduleKey: string): Promise<any[]> {

  const module =
    getModule(moduleKey);

  if (!module) {
    console.warn(
      "[ERPBusinessMetricsEngine] Module introuvable:",
      moduleKey
    );

    return [];
  }

  return RuntimeDataBinding.list(module);
}

export class ERPBusinessMetricsEngine {

  static async load():
    Promise<ERPBusinessDashboardMetrics> {

    const terrains =
      await listModule("terrains");

    const exploitations =
      await listModule("exploitations");

    const contrats =
      await listModule("contrats");

    const campagnes =
      await listModule("campagnes");

    const stocks =
      await listModule("stocks");

    const actifs =
      await listModule("actifs");

    const contratsActifs =
      contrats.filter(
        (c: any) =>
          c.statutContrat === "Actif"
      );

    const campagnesActives =
      campagnes.filter(
        (c: any) =>
          c.statutCampagne === "En cours"
      );

    const stocksBas =
      stocks.filter(
        (s: any) =>
          s.statutStock === "Bas"
      );

    const actifsMaintenance =
      actifs.filter(
        (a: any) =>
          a.statutActif === "Maintenance"
      );

    return {
      terrains: terrains.length,
      exploitations: exploitations.length,
      contratsActifs: contratsActifs.length,
      campagnesActives: campagnesActives.length,
      stocksBas: stocksBas.length,
      actifsMaintenance: actifsMaintenance.length,
    };
  }
}
'@

Write-File $Path $Content

Write-Host ""
Write-Host "DONE"
Write-Host "NEXT: pnpm build"