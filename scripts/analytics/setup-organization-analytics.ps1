$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " ORGANIZATION ANALYTICS SETUP"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "$ProjectRoot\src\features\organization-analytics\services",
  "$ProjectRoot\src\features\organization-analytics\components",
  "$ProjectRoot\src\features\organization-analytics\hooks"
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
# ANALYTICS SERVICE
# -------------------------------------------------

$service = @'
import { BillingService }
from "@/features/billing/services/BillingService";

export const OrganizationAnalyticsService = {

  async getMetrics() {

    return {

      users: 18,

      activeUsers: 12,

      products: 154,

      stocks: 82,

      exploitations: 7,

      alerts: 4,

      plan: "pro",

      limits:
        BillingService.getPlanLimits(
          "pro"
        ),
    };
  },
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\organization-analytics\services\OrganizationAnalyticsService.ts",
  $service
)

Write-Host "Created: OrganizationAnalyticsService.ts"

# -------------------------------------------------
# ANALYTICS CARDS
# -------------------------------------------------

$cards = @'
"use client";

import {
  useEffect,
  useState,
} from "react";

import { OrganizationAnalyticsService }
from "@/features/organization-analytics/services/OrganizationAnalyticsService";

export const OrganizationAnalyticsCards =
() => {

  const [metrics, setMetrics] =
    useState<any>(null);

  useEffect(() => {

    async function load() {

      const data =
        await OrganizationAnalyticsService
          .getMetrics();

      setMetrics(data);
    }

    load();

  }, []);

  if (!metrics) {

    return null;
  }

  const cards = [
    {
      label: "Utilisateurs",
      value: metrics.users,
    },
    {
      label: "Actifs",
      value: metrics.activeUsers,
    },
    {
      label: "Produits",
      value: metrics.products,
    },
    {
      label: "Stocks",
      value: metrics.stocks,
    },
    {
      label: "Exploitations",
      value: metrics.exploitations,
    },
    {
      label: "Alertes",
      value: metrics.alerts,
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      "
    >
      {cards.map((card) => (

        <div
          key={card.label}
          className="
            bg-white
            border
            rounded-2xl
            p-6
          "
        >
          <div
            className="
              text-sm
              text-gray-500
            "
          >
            {card.label}
          </div>

          <div
            className="
              text-3xl
              font-bold
              mt-2
            "
          >
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\organization-analytics\components\OrganizationAnalyticsCards.tsx",
  $cards
)

Write-Host "Created: OrganizationAnalyticsCards.tsx"

# -------------------------------------------------
# PLAN USAGE CARD
# -------------------------------------------------

$usage = @'
"use client";

import {
  useEffect,
  useState,
} from "react";

import { OrganizationAnalyticsService }
from "@/features/organization-analytics/services/OrganizationAnalyticsService";

export const PlanUsageCard =
() => {

  const [metrics, setMetrics] =
    useState<any>(null);

  useEffect(() => {

    async function load() {

      const data =
        await OrganizationAnalyticsService
          .getMetrics();

      setMetrics(data);
    }

    load();

  }, []);

  if (!metrics) {

    return null;
  }

  return (
    <div
      className="
        bg-white
        border
        rounded-2xl
        p-6
        space-y-4
      "
    >
      <div>

        <h2
          className="
            text-xl
            font-semibold
          "
        >
          Plan actuel
        </h2>

        <p
          className="
            text-gray-500
            mt-1
          "
        >
          Usage organisationnel
        </p>
      </div>

      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <span>Plan</span>

        <strong>
          {metrics.plan}
        </strong>
      </div>

      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <span>Utilisateurs max</span>

        <strong>
          {
            metrics.limits.maxUsers
          }
        </strong>
      </div>

      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <span>Analytics</span>

        <strong>
          {
            metrics.limits.analytics
              ? "Oui"
              : "Non"
          }
        </strong>
      </div>

    </div>
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\organization-analytics\components\PlanUsageCard.tsx",
  $usage
)

Write-Host "Created: PlanUsageCard.tsx"

# -------------------------------------------------
# ANALYTICS PAGE
# -------------------------------------------------

$pageDir =
"$ProjectRoot\src\app\(private)\organization-analytics"

if (!(Test-Path $pageDir)) {

  New-Item `
    -ItemType Directory `
    -Path $pageDir `
    -Force | Out-Null

  Write-Host "Created: analytics page dir"
}

$page = @'
import { OrganizationAnalyticsCards }
from "@/features/organization-analytics/components/OrganizationAnalyticsCards";

import { PlanUsageCard }
from "@/features/organization-analytics/components/PlanUsageCard";

export default function
OrganizationAnalyticsPage() {

  return (
    <div
      className="
        p-6
        space-y-6
      "
    >
      <div>

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Organization Analytics
        </h1>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          Métriques SaaS organisationnelles
        </p>
      </div>

      <OrganizationAnalyticsCards />

      <PlanUsageCard />
    </div>
  );
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\app\(private)\organization-analytics\page.tsx",
  $page
)

Write-Host "Created: organization analytics page"

Write-Host ""
Write-Host "======================================="
Write-Host " ORGANIZATION ANALYTICS COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. pnpm build"
Write-Host "2. git commit"
Write-Host "3. firebase deploy"
Write-Host ""