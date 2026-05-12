$ErrorActionPreference = "Stop"

$Root = "C:\Users\Admin\terragest"

function Ensure-Dir($Path) {
  if (!(Test-Path $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
  }
}

function Write-File($Path, $Content) {
  $Dir = Split-Path $Path -Parent
  Ensure-Dir $Dir

  [System.IO.File]::WriteAllText(
    $Path,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host "WRITTEN $Path"
}

Write-Host "=== BUSINESS RUNTIME DASHBOARD ==="

Ensure-Dir "$Root\src\runtime\dashboard"
Ensure-Dir "$Root\src\components\erp\dashboard\business\widgets"

$MetricsTypes = @'
export interface ERPBusinessMetric {
  key: string;
  label: string;
  value: number;
  href?: string;
}

export interface ERPBusinessDashboardMetrics {
  terrains: number;
  exploitations: number;
  contratsActifs: number;
  campagnesActives: number;
  stocksBas: number;
  actifsMaintenance: number;
}
'@

$MetricsEngine = @'
import type {
  ERPBusinessDashboardMetrics,
}
from "./ERPDashboardMetrics";

import { RuntimeDataBinding }
from "@/runtime/data-binding";

export class ERPBusinessMetricsEngine {

  static async load():
    Promise<ERPBusinessDashboardMetrics> {

    const terrains =
      await RuntimeDataBinding.list("terrains");

    const exploitations =
      await RuntimeDataBinding.list("exploitations");

    const contrats =
      await RuntimeDataBinding.list("contrats");

    const campagnes =
      await RuntimeDataBinding.list("campagnes");

    const stocks =
      await RuntimeDataBinding.list("stocks");

    const actifs =
      await RuntimeDataBinding.list("actifs");

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

$KPICard = @'
interface ERPKPICardProps {
  label: string;
  value: number;
}

export function ERPKPICard({
  label,
  value,
}: ERPKPICardProps) {

  return (

    <div
      className="
        rounded-2xl
        border
        bg-white
        p-6
        shadow-sm
      "
    >
      <p
        className="
          text-sm
          text-slate-500
        "
      >
        {label}
      </p>

      <h2
        className="
          mt-3
          text-4xl
          font-bold
          text-slate-950
        "
      >
        {value}
      </h2>
    </div>
  );
}
'@

$DashboardComponent = @'
"use client";

import { useEffect, useState }
from "react";

import {
  ERPBusinessMetricsEngine,
}
from "@/runtime/dashboard/ERPBusinessMetricsEngine";

import type {
  ERPBusinessDashboardMetrics,
}
from "@/runtime/dashboard/ERPDashboardMetrics";

import {
  ERPKPICard,
}
from "./widgets/ERPKPICard";

export function ERPBusinessDashboard() {

  const [
    metrics,
    setMetrics,
  ] = useState<
    ERPBusinessDashboardMetrics | null
  >(null);

  useEffect(() => {

    async function load() {

      const data =
        await ERPBusinessMetricsEngine.load();

      setMetrics(data);
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

    </main>
  );
}
'@

Write-File `
"$Root\src\runtime\dashboard\ERPDashboardMetrics.ts" `
$MetricsTypes

Write-File `
"$Root\src\runtime\dashboard\ERPBusinessMetricsEngine.ts" `
$MetricsEngine

Write-File `
"$Root\src\components\erp\dashboard\business\widgets\ERPKPICard.tsx" `
$KPICard

Write-File `
"$Root\src\components\erp\dashboard\business\ERPBusinessDashboard.tsx" `
$DashboardComponent

Write-Host ""
Write-Host "DONE BUSINESS RUNTIME DASHBOARD"
Write-Host "NEXT:"
Write-Host "pnpm build"