$ErrorActionPreference = "Stop"

$Root = "C:\Users\Admin\terragest"

function Ensure-Dir($Path) {

  if (!(Test-Path $Path)) {

    New-Item `
      -ItemType Directory `
      -Path $Path `
      -Force | Out-Null
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

Write-Host ""
Write-Host "=== TERRAGEST BUSINESS ALERTS ==="
Write-Host ""

Ensure-Dir "$Root\src\runtime\dashboard"
Ensure-Dir "$Root\src\components\erp\dashboard\business\widgets"

$AlertsTypes = @'
export interface ERPBusinessAlert {

  id: string;

  level:
    | "info"
    | "warning"
    | "critical";

  title: string;

  message: string;

  entityType?: string;

  entityId?: string;
}
'@

$AlertEngine = @'
import type {
  ERPBusinessAlert,
}
from "./ERPBusinessAlerts";

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

function getModule(
  moduleKey: string
): ERPModule | null {

  return (
    coreERPModules.find(
      (module) =>
        module.metadata.key === moduleKey
    ) ?? null
  );
}

async function listModule(
  moduleKey: string
): Promise<any[]> {

  const module =
    getModule(moduleKey);

  if (!module) {
    return [];
  }

  return RuntimeDataBinding.list(module);
}

function daysBetween(
  date: Date
): number {

  const now =
    new Date();

  const diff =
    date.getTime() - now.getTime();

  return Math.ceil(
    diff / (1000 * 60 * 60 * 24)
  );
}

export class ERPBusinessAlertEngine {

  static async load():
    Promise<ERPBusinessAlert[]> {

    const alerts:
      ERPBusinessAlert[] = [];

    const contrats =
      await listModule("contrats");

    const stocks =
      await listModule("stocks");

    const actifs =
      await listModule("actifs");

    const campagnes =
      await listModule("campagnes");

    for (const contrat of contrats) {

      if (
        !contrat.dateFin
      ) {
        continue;
      }

      const days =
        daysBetween(
          new Date(
            contrat.dateFin
          )
        );

      if (
        days <= 30 &&
        contrat.statutContrat === "Actif"
      ) {

        alerts.push({
          id:
            "contrat-" +
            contrat.id,

          level:
            days <= 7
              ? "critical"
              : "warning",

          title:
            "Contrat proche expiration",

          message:
            contrat.nom ??
            contrat.code ??
            "Contrat" +
            " expire dans " +
            days +
            " jours.",

          entityType:
            "contrats",

          entityId:
            contrat.id,
        });
      }
    }

    for (const stock of stocks) {

      if (
        stock.statutStock === "Bas"
      ) {

        alerts.push({
          id:
            "stock-" +
            stock.id,

          level:
            "warning",

          title:
            "Stock critique",

          message:
            stock.nom ??
            "Stock sous seuil minimum.",

          entityType:
            "stocks",

          entityId:
            stock.id,
        });
      }
    }

    for (const actif of actifs) {

      if (
        actif.statutActif ===
        "Maintenance"
      ) {

        alerts.push({
          id:
            "actif-" +
            actif.id,

          level:
            "warning",

          title:
            "Actif maintenance",

          message:
            actif.nom ??
            "Actif en maintenance.",

          entityType:
            "actifs",

          entityId:
            actif.id,
        });
      }
    }

    for (const campagne of campagnes) {

      if (
        campagne.statutCampagne ===
        "Suspendue"
      ) {

        alerts.push({
          id:
            "campagne-" +
            campagne.id,

          level:
            "critical",

          title:
            "Campagne suspendue",

          message:
            campagne.nom ??
            "Campagne suspendue.",

          entityType:
            "campagnes",

          entityId:
            campagne.id,
        });
      }
    }

    return alerts;
  }
}
'@

$AlertPanel = @'
import type {
  ERPBusinessAlert,
}
from "@/runtime/dashboard/ERPBusinessAlerts";

interface ERPAlertPanelProps {
  alerts: ERPBusinessAlert[];
}

export function ERPAlertPanel({
  alerts,
}: ERPAlertPanelProps) {

  if (
    alerts.length === 0
  ) {

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
        <h2
          className="
            text-lg
            font-semibold
            text-slate-950
          "
        >
          Alertes métier
        </h2>

        <p
          className="
            mt-4
            text-sm
            text-slate-500
          "
        >
          Aucune alerte détectée.
        </p>
      </div>
    );
  }

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

      <h2
        className="
          text-lg
          font-semibold
          text-slate-950
        "
      >
        Alertes métier
      </h2>

      <div
        className="
          mt-5
          space-y-3
        "
      >

        {alerts.map(
          (alert) => (

            <div
              key={alert.id}
              className={`
                rounded-xl
                border
                p-4
                text-sm

                ${
                  alert.level ===
                  "critical"

                    ? `
                      border-red-200
                      bg-red-50
                      text-red-900
                    `

                    : `
                      border-amber-200
                      bg-amber-50
                      text-amber-900
                    `
                }
              `}
            >

              <div
                className="
                  font-semibold
                "
              >
                {alert.title}
              </div>

              <div
                className="
                  mt-1
                "
              >
                {alert.message}
              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}
'@

Write-File `
"$Root\src\runtime\dashboard\ERPBusinessAlerts.ts" `
$AlertsTypes

Write-File `
"$Root\src\runtime\dashboard\ERPBusinessAlertEngine.ts" `
$AlertEngine

Write-File `
"$Root\src\components\erp\dashboard\business\widgets\ERPAlertPanel.tsx" `
$AlertPanel

Write-Host ""
Write-Host "DONE BUSINESS ALERT ENGINE"
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. brancher ERPBusinessDashboard"
Write-Host "2. pnpm build"