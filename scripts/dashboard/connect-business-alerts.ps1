$ErrorActionPreference = "Stop"

$Root =
"C:\Users\Admin\terragest"

function Write-File(
  $Path,
  $Content
) {

  $Dir =
    Split-Path $Path -Parent

  if (!(Test-Path $Dir)) {

    New-Item `
      -ItemType Directory `
      -Path $Dir `
      -Force | Out-Null
  }

  [System.IO.File]::WriteAllText(
    $Path,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host "WRITTEN $Path"
}

$DashboardPath =
"$Root\src\components\erp\dashboard\business\ERPBusinessDashboard.tsx"

$DashboardContent = @'
"use client";

import {
  useEffect,
  useState,
}
from "react";

import {
  ERPBusinessMetricsEngine,
}
from "@/runtime/dashboard/ERPBusinessMetricsEngine";

import {
  ERPBusinessAlertEngine,
}
from "@/runtime/dashboard/ERPBusinessAlertEngine";

import type {
  ERPBusinessDashboardMetrics,
}
from "@/runtime/dashboard/ERPDashboardMetrics";

import type {
  ERPBusinessAlert,
}
from "@/runtime/dashboard/ERPBusinessAlerts";

import {
  ERPKPICard,
}
from "./widgets/ERPKPICard";

import {
  ERPAlertPanel,
}
from "./widgets/ERPAlertPanel";

export function ERPBusinessDashboard() {

  const [
    metrics,
    setMetrics,
  ] = useState<
    ERPBusinessDashboardMetrics | null
  >(null);

  const [
    alerts,
    setAlerts,
  ] = useState<
    ERPBusinessAlert[]
  >([]);

  useEffect(() => {

    async function load() {

      const metricsData =
        await ERPBusinessMetricsEngine.load();

      const alertsData =
        await ERPBusinessAlertEngine.load();

      setMetrics(
        metricsData
      );

      setAlerts(
        alertsData
      );
    }

    load();

  }, []);

  if (!metrics) {

    return (

      <div className="p-10">
        Chargement dashboard métier...
      </div>
    );
  }

  return (

    <main
      className="
        space-y-8
        p-8
      "
    >

      <section
        className="
          rounded-3xl
          border
          bg-white
          p-8
          shadow-sm
        "
      >

        <p
          className="
            text-sm
            font-medium
            text-emerald-700
          "
        >
          Tableau de bord métier
        </p>

        <h1
          className="
            mt-2
            text-3xl
            font-bold
            text-slate-950
          "
        >
          Cockpit TerraGest
        </h1>

        <p
          className="
            mt-3
            max-w-3xl
            text-slate-600
          "
        >
          Pilotage des terrains,
          contrats,
          exploitations,
          campagnes,
          ressources,
          actifs,
          stocks
          et rentabilité.
        </p>

      </section>

      <section
        className="
          grid
          gap-4
          md:grid-cols-2
          xl:grid-cols-3
        "
      >

        <ERPKPICard
          label="Terrains"
          value={metrics.terrains}
        />

        <ERPKPICard
          label="Exploitations"
          value={metrics.exploitations}
        />

        <ERPKPICard
          label="Contrats actifs"
          value={metrics.contratsActifs}
        />

        <ERPKPICard
          label="Campagnes actives"
          value={metrics.campagnesActives}
        />

        <ERPKPICard
          label="Stocks bas"
          value={metrics.stocksBas}
        />

        <ERPKPICard
          label="Actifs maintenance"
          value={metrics.actifsMaintenance}
        />

      </section>

      <ERPAlertPanel
        alerts={alerts}
      />

    </main>
  );
}
'@

Write-File `
$DashboardPath `
$DashboardContent

Write-Host ""
Write-Host "DONE ALERTS CONNECTED"
Write-Host ""
Write-Host "NEXT:"
Write-Host "pnpm build"
