$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " TERRAGEST DASHBOARD SETUP"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# CREATE DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "$ProjectRoot\src\components\dashboard",
  "$ProjectRoot\src\app\(private)\dashboard"
)

foreach ($dir in $dirs) {

  if (!(Test-Path $dir)) {

    New-Item `
      -ItemType Directory `
      -Path $dir `
      -Force | Out-Null

    Write-Host "Created: $dir"
  }
}

# -------------------------------------------------
# KPI CARD
# -------------------------------------------------

$kpiCard = @'
type Props = {
  title: string;
  value: string;
  subtitle: string;
};

export const KPICard = ({
  title,
  value,
  subtitle,
}: Props) => {

  return (
    <div
      className="
        bg-white
        rounded-2xl
        p-6
        shadow-sm
        border
      "
    >
      <p
        className="
          text-sm
          text-gray-500
        "
      >
        {title}
      </p>

      <h3
        className="
          text-3xl
          font-bold
          mt-2
        "
      >
        {value}
      </h3>

      <p
        className="
          text-sm
          text-green-600
          mt-3
        "
      >
        {subtitle}
      </p>
    </div>
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\components\dashboard\KPICard.tsx",
  $kpiCard
)

Write-Host "Created: KPICard.tsx"

# -------------------------------------------------
# RECENT ACTIVITIES
# -------------------------------------------------

$recentActivities = @'
const activities = [
  "Ajout d’un nouveau produit",
  "Mise à jour du stock",
  "Création d’une exploitation",
  "Maintenance matériel",
];

export const RecentActivities =
() => {

  return (
    <div
      className="
        bg-white
        rounded-2xl
        p-6
        border
        shadow-sm
      "
    >
      <h3
        className="
          text-xl
          font-semibold
          mb-4
        "
      >
        Activités Récentes
      </h3>

      <div className="space-y-3">

        {activities.map(
          (activity, index) => (

          <div
            key={index}
            className="
              p-3
              rounded-xl
              bg-gray-50
            "
          >
            {activity}
          </div>
        ))}
      </div>
    </div>
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\components\dashboard\RecentActivities.tsx",
  $recentActivities
)

Write-Host "Created: RecentActivities.tsx"

# -------------------------------------------------
# ALERTS PANEL
# -------------------------------------------------

$alertsPanel = @'
const alerts = [
  "Stock faible sur engrais",
  "Maintenance tracteur requise",
  "Intervention urgente",
];

export const AlertsPanel = () => {

  return (
    <div
      className="
        bg-white
        rounded-2xl
        p-6
        border
        shadow-sm
      "
    >
      <h3
        className="
          text-xl
          font-semibold
          mb-4
        "
      >
        Alertes
      </h3>

      <div className="space-y-3">

        {alerts.map(
          (alert, index) => (

          <div
            key={index}
            className="
              p-3
              rounded-xl
              bg-red-50
              text-red-700
            "
          >
            {alert}
          </div>
        ))}
      </div>
    </div>
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\components\dashboard\AlertsPanel.tsx",
  $alertsPanel
)

Write-Host "Created: AlertsPanel.tsx"

# -------------------------------------------------
# DASHBOARD PAGE
# -------------------------------------------------

$dashboardPage = @'
import { KPICard }
from "@/components/dashboard/KPICard";

import { RecentActivities }
from "@/components/dashboard/RecentActivities";

import { AlertsPanel }
from "@/components/dashboard/AlertsPanel";

export default function DashboardPage() {

  return (
    <div className="space-y-6">

      <div>

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Dashboard
        </h1>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          Vue globale de votre ERP agricole
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >
        <KPICard
          title="Exploitations"
          value="24"
          subtitle="+12% ce mois"
        />

        <KPICard
          title="Produits"
          value="128"
          subtitle="+8 nouveaux"
        />

        <KPICard
          title="Stocks"
          value="87%"
          subtitle="Disponibilité"
        />

        <KPICard
          title="Matériels"
          value="16"
          subtitle="2 maintenances"
        />
      </div>

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-6
        "
      >
        <div className="xl:col-span-2">
          <RecentActivities />
        </div>

        <AlertsPanel />
      </div>
    </div>
  );
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\app\(private)\dashboard\page.tsx",
  $dashboardPage
)

Write-Host "Created: dashboard page"

Write-Host ""
Write-Host "======================================="
Write-Host " DASHBOARD COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. pnpm build"
Write-Host "2. firebase deploy"
Write-Host ""