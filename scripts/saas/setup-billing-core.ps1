$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " BILLING CORE SETUP"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "$ProjectRoot\src\features\billing\types",
  "$ProjectRoot\src\features\billing\repositories",
  "$ProjectRoot\src\features\billing\services",
  "$ProjectRoot\src\features\billing\hooks",
  "$ProjectRoot\src\features\billing\components"
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
# BILLING TYPES
# -------------------------------------------------

$types = @'
import {
  BaseAuditEntity,
}
from "@/types/BaseEntity";

export type BillingPlan =
  | "free"
  | "pro"
  | "enterprise";

export type SubscriptionStatus =
  | "active"
  | "trialing"
  | "past_due"
  | "cancelled";

export type Subscription =
BaseAuditEntity & {

  organizationId: string;

  tenantId: string;

  plan: BillingPlan;

  status: SubscriptionStatus;

  seats: number;

  currentPeriodEnd: string;
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\billing\types\Subscription.ts",
  $types
)

Write-Host "Created: Subscription.ts"

# -------------------------------------------------
# BILLING REPOSITORY
# -------------------------------------------------

$repository = @'
import { BaseRepository }
from "@/lib/firestore/BaseRepository";

import { Subscription }
from "@/features/billing/types/Subscription";

class BillingRepositoryClass
extends BaseRepository<Subscription> {

  constructor() {

    super("subscriptions");
  }
}

export const BillingRepository =
  new BillingRepositoryClass();
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\billing\repositories\BillingRepository.ts",
  $repository
)

Write-Host "Created: BillingRepository.ts"

# -------------------------------------------------
# BILLING SERVICE
# -------------------------------------------------

$service = @'
import { BillingPlan }
from "@/features/billing/types/Subscription";

import { BillingRepository }
from "@/features/billing/repositories/BillingRepository";

export const BillingService = {

  getPlanLimits(
    plan: BillingPlan
  ) {

    switch (plan) {

      case "free":

        return {
          maxUsers: 3,
          analytics: false,
          realtime: false,
        };

      case "pro":

        return {
          maxUsers: 25,
          analytics: true,
          realtime: true,
        };

      case "enterprise":

        return {
          maxUsers: 999,
          analytics: true,
          realtime: true,
        };

      default:

        return {
          maxUsers: 1,
          analytics: false,
          realtime: false,
        };
    }
  },

  async getSubscriptions() {

    return await
      BillingRepository.getAll();
  },

  async updatePlan(
    id: string,
    plan: BillingPlan
  ) {

    return await
      BillingRepository.update(
        id,
        {
          plan,
        }
      );
  },
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\billing\services\BillingService.ts",
  $service
)

Write-Host "Created: BillingService.ts"

# -------------------------------------------------
# USE BILLING
# -------------------------------------------------

$hook = @'
"use client";

import { useCollection }
from "@/hooks/useCollection";

import { Subscription }
from "@/features/billing/types/Subscription";

export function useSubscriptions() {

  return useCollection<Subscription>(
    "subscriptions"
  );
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\billing\hooks\useSubscriptions.ts",
  $hook
)

Write-Host "Created: useSubscriptions.ts"

# -------------------------------------------------
# BILLING PLANS
# -------------------------------------------------

$plans = @'
"use client";

import { BillingPlan }
from "@/features/billing/types/Subscription";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "0€",
    features: [
      "3 utilisateurs",
      "CRUD standard",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "49€",
    features: [
      "25 utilisateurs",
      "Analytics",
      "Temps réel",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Sur devis",
    features: [
      "Illimité",
      "Multi-tenant",
      "Support premium",
    ],
  },
];

export const BillingPlans =
() => {

  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
      "
    >
      {plans.map((plan) => (

        <div
          key={plan.id}
          className="
            border
            rounded-2xl
            p-6
            bg-white
          "
        >
          <div
            className="
              space-y-4
            "
          >
            <div>

              <h2
                className="
                  text-2xl
                  font-bold
                "
              >
                {plan.name}
              </h2>

              <p
                className="
                  text-3xl
                  font-bold
                  mt-2
                "
              >
                {plan.price}
              </p>
            </div>

            <ul
              className="
                space-y-2
              "
            >
              {plan.features.map(
                (feature) => (

                <li
                  key={feature}
                  className="
                    text-gray-600
                  "
                >
                  • {feature}
                </li>
              ))}
            </ul>

            <button
              className="
                w-full
                bg-black
                text-white
                py-3
                rounded-xl
              "
            >
              Choisir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\billing\components\BillingPlans.tsx",
  $plans
)

Write-Host "Created: BillingPlans.tsx"

# -------------------------------------------------
# BILLING PAGE
# -------------------------------------------------

$pageDir =
"$ProjectRoot\src\app\(private)\billing"

if (!(Test-Path $pageDir)) {

  New-Item `
    -ItemType Directory `
    -Path $pageDir `
    -Force | Out-Null

  Write-Host "Created: billing page dir"
}

$page = @'
import { BillingPlans }
from "@/features/billing/components/BillingPlans";

export default function BillingPage() {

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
          Billing
        </h1>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          Plans et abonnements
        </p>
      </div>

      <BillingPlans />
    </div>
  );
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\app\(private)\billing\page.tsx",
  $page
)

Write-Host "Created: billing page"

Write-Host ""
Write-Host "======================================="
Write-Host " BILLING CORE COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. pnpm build"
Write-Host "2. git commit"
Write-Host "3. firebase deploy"
Write-Host ""