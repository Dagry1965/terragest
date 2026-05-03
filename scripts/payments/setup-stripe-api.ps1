$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " STRIPE API INTEGRATION"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "$ProjectRoot\src\app\api\stripe\checkout",
  "$ProjectRoot\src\app\api\stripe\webhook",
  "$ProjectRoot\src\lib\stripe"
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
# STRIPE CLIENT
# -------------------------------------------------

$stripeClient = @'
import Stripe
from "stripe";

export const stripe =
  new Stripe(
    process.env.STRIPE_SECRET_KEY!,
    {
      apiVersion: "2025-03-31.basil",
    }
  );
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\lib\stripe\client.ts",
  $stripeClient
)

Write-Host "Created: Stripe client"

# -------------------------------------------------
# CHECKOUT API
# -------------------------------------------------

$checkout = @'
import {
  NextResponse,
} from "next/server";

import { stripe }
from "@/lib/stripe/client";

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const { plan } = body;

    const prices: any = {

      pro:
        process.env
          .STRIPE_PRICE_PRO,

      enterprise:
        process.env
          .STRIPE_PRICE_ENTERPRISE,
    };

    const priceId =
      prices[plan];

    if (!priceId) {

      return NextResponse.json(
        {
          error:
            "Plan invalide",
        },
        {
          status: 400,
        }
      );
    }

    const session =
      await stripe.checkout.sessions
        .create({

          mode:
            "subscription",

          line_items: [
            {
              price: priceId,
              quantity: 1,
            },
          ],

          success_url:
            `${process.env.NEXT_PUBLIC_APP_URL}/billing/success`,

          cancel_url:
            `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
        });

    return NextResponse.json({
      url: session.url,
    });

  } catch (e: any) {

    return NextResponse.json(
      {
        error:
          e.message,
      },
      {
        status: 500,
      }
    );
  }
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\app\api\stripe\checkout\route.ts",
  $checkout
)

Write-Host "Created: checkout route"

# -------------------------------------------------
# WEBHOOK API
# -------------------------------------------------

$webhook = @'
import {
  NextResponse,
} from "next/server";

export async function POST() {

  return NextResponse.json({
    received: true,
  });
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\app\api\stripe\webhook\route.ts",
  $webhook
)

Write-Host "Created: webhook route"

# -------------------------------------------------
# PAYMENT SERVICE PATCH
# -------------------------------------------------

$paymentService = @'
import {
  CheckoutPlan,
  CheckoutSession,
} from "@/features/payments/types/Checkout";

export const PaymentService = {

  async createCheckout(
    plan: CheckoutPlan
  ): Promise<CheckoutSession> {

    const response =
      await fetch(
        "/api/stripe/checkout",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            plan,
          }),
        }
      );

    const data =
      await response.json();

    if (!response.ok) {

      throw new Error(
        data.error
      );
    }

    return {
      url: data.url,
      plan,
    };
  },
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\payments\services\PaymentService.ts",
  $paymentService
)

Write-Host "Updated: PaymentService.ts"

# -------------------------------------------------
# ENV SAMPLE
# -------------------------------------------------

$env = @'
STRIPE_SECRET_KEY=sk_test_xxx

STRIPE_PRICE_PRO=price_xxx

STRIPE_PRICE_ENTERPRISE=price_xxx

NEXT_PUBLIC_APP_URL=http://localhost:3000
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\.env.stripe.example",
  $env
)

Write-Host "Created: .env.stripe.example"

Write-Host ""
Write-Host "======================================="
Write-Host " STRIPE API COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. pnpm add stripe"
Write-Host "2. copy env vars"
Write-Host "3. pnpm build"
Write-Host "4. git commit"
Write-Host ""