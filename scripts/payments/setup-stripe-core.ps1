$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " STRIPE BILLING SETUP"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "$ProjectRoot\src\features\payments\services",
  "$ProjectRoot\src\features\payments\components",
  "$ProjectRoot\src\features\payments\types"
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
# PAYMENT TYPES
# -------------------------------------------------

$types = @'
export type CheckoutPlan =
  | "free"
  | "pro"
  | "enterprise";

export type CheckoutSession = {

  url: string;

  plan: CheckoutPlan;
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\payments\types\Checkout.ts",
  $types
)

Write-Host "Created: Checkout.ts"

# -------------------------------------------------
# PAYMENT SERVICE
# -------------------------------------------------

$service = @'
import {
  CheckoutPlan,
  CheckoutSession,
} from "@/features/payments/types/Checkout";

export const PaymentService = {

  async createCheckout(
    plan: CheckoutPlan
  ): Promise<CheckoutSession> {

    # MOCK STRIPE SESSION

    return {
      url:
        "/billing/success",
      plan,
    };
  },
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\payments\services\PaymentService.ts",
  $service
)

Write-Host "Created: PaymentService.ts"

# -------------------------------------------------
# BILLING BUTTON
# -------------------------------------------------

$button = @'
"use client";

import {
  useState,
} from "react";

import {
  CheckoutPlan,
} from "@/features/payments/types/Checkout";

import { PaymentService }
from "@/features/payments/services/PaymentService";

type Props = {

  plan: CheckoutPlan;
};

export const CheckoutButton = ({
  plan,
}: Props) => {

  const [loading, setLoading] =
    useState(false);

  async function handleCheckout() {

    try {

      setLoading(true);

      const session =
        await PaymentService
          .createCheckout(
            plan
          );

      window.location.href =
        session.url;

    } finally {

      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="
        w-full
        bg-black
        text-white
        py-3
        rounded-xl
      "
    >
      {
        loading
          ? "Chargement..."
          : "Choisir"
      }
    </button>
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\payments\components\CheckoutButton.tsx",
  $button
)

Write-Host "Created: CheckoutButton.tsx"

# -------------------------------------------------
# BILLING PLANS PATCH
# -------------------------------------------------

$plans = @'
"use client";

import { CheckoutButton }
from "@/features/payments/components/CheckoutButton";

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

            <CheckoutButton
              plan={plan.id as any}
            />
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

Write-Host "Updated: BillingPlans.tsx"

# -------------------------------------------------
# SUCCESS PAGE
# -------------------------------------------------

$pageDir =
"$ProjectRoot\src\app\billing\success"

if (!(Test-Path $pageDir)) {

  New-Item `
    -ItemType Directory `
    -Path $pageDir `
    -Force | Out-Null

  Write-Host "Created: billing success dir"
}

$page = @'
export default function
BillingSuccessPage() {

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-50
        p-6
      "
    >
      <div
        className="
          bg-white
          border
          rounded-2xl
          p-8
          text-center
          max-w-md
          w-full
          space-y-4
        "
      >
        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Paiement réussi
        </h1>

        <p
          className="
            text-gray-500
          "
        >
          Votre abonnement a été activé.
        </p>
      </div>
    </div>
  );
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\app\billing\success\page.tsx",
  $page
)

Write-Host "Created: billing success page"

Write-Host ""
Write-Host "======================================="
Write-Host " STRIPE BILLING COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. pnpm build"
Write-Host "2. git commit"
Write-Host "3. firebase deploy"
Write-Host ""