Write-Host "Generating Terragest SaaS Billing Platform..." -ForegroundColor Cyan

# =====================================================
# GO TO WEB ERP ROOT
# =====================================================

Set-Location "..\..\"

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\features\billing" -Force
mkdir "src\features\billing\types" -Force
mkdir "src\features\billing\services" -Force
mkdir "src\features\billing\components" -Force
mkdir "src\features\billing\hooks" -Force

# =====================================================
# SUBSCRIPTION TYPE
# =====================================================

$subscriptionType = @'
export interface Subscription {

  id: string;

  organisationId: string;

  plan: string;

  statut: string;

  montantMensuel: number;

  devise: string;

  dateDebut: string;

  dateFin?: string;

  quotaUtilisateurs?: number;

  quotaStockage?: number;

  quotaApi?: number;
}
'@

Set-Content `
"src\features\billing\types\Subscription.ts" `
$subscriptionType

# =====================================================
# BILLING PLAN TYPE
# =====================================================

$planType = @'
export interface BillingPlan {

  id: string;

  nom: string;

  prixMensuel: number;

  devise: string;

  utilisateursMax: number;

  stockageMax: number;

  apiQuota: number;

  supportPremium: boolean;
}
'@

Set-Content `
"src\features\billing\types\BillingPlan.ts" `
$planType

# =====================================================
# BILLING SERVICE
# =====================================================

$billingService = @'
import {
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

export const BillingService = {

  async createSubscription(
    data: any
  ) {

    return addDoc(
      collection(
        db,
        "subscriptions"
      ),
      data
    );
  },

  async getSubscriptions() {

    const snapshot =
      await getDocs(
        collection(
          db,
          "subscriptions"
        )
      );

    return snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );
  },
};
'@

Set-Content `
"src\features\billing\services\BillingService.ts" `
$billingService

# =====================================================
# BILLING ENGINE
# =====================================================

$billingEngine = @'
export const BillingEngine = {

  calculateMonthlyRevenue(
    subscriptions: any[]
  ) {

    return subscriptions.reduce(
      (
        total,
        subscription
      ) =>

        total +
        (
          subscription.montantMensuel || 0
        ),

      0
    );
  },

  computeUsage(
    organisation: any
  ) {

    return {

      utilisateurs:
        0,

      stockage:
        0,

      apiCalls:
        0,
    };
  },
};
'@

Set-Content `
"src\features\billing\services\BillingEngine.ts" `
$billingEngine

# =====================================================
# PLAN CARD
# =====================================================

$planCard = @'
interface PlanCardProps {

  plan: any;
}

export const PlanCard = ({
  plan,
}: PlanCardProps) => {

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-md
      p-6
      border
    ">

      <h2 className="
        text-3xl
        font-bold
      ">
        {plan.nom}
      </h2>

      <div className="
        mt-6
      ">

        <p className="
          text-5xl
          font-bold
        ">
          {plan.prixMensuel}
        </p>

        <p className="
          text-gray-500
          mt-2
        ">
          {plan.devise} / mois
        </p>

      </div>

      <div className="
        mt-8
        space-y-3
      ">

        <p>
          👥
          {plan.utilisateursMax}
          utilisateurs
        </p>

        <p>
          ☁️
          {plan.stockageMax}
          GB stockage
        </p>

        <p>
          🔌
          {plan.apiQuota}
          API calls
        </p>

        <p>
          ⭐
          {plan.supportPremium
            ? "Support premium"
            : "Support standard"}
        </p>

      </div>

      <button className="
        mt-8
        w-full
        bg-black
        text-white
        py-3
        rounded-xl
      ">
        Choisir
      </button>

    </div>
  );
}
'@

Set-Content `
"src\features\billing\components\PlanCard.tsx" `
$planCard

# =====================================================
# BILLING DASHBOARD
# =====================================================

$billingDashboard = @'
"use client";

import { PlanCard } from "@/features/billing/components/PlanCard";

const plans = [

  {
    id: "starter",

    nom: "Starter",

    prixMensuel: 49,

    devise: "EUR",

    utilisateursMax: 5,

    stockageMax: 20,

    apiQuota: 10000,

    supportPremium: false,
  },

  {
    id: "business",

    nom: "Business",

    prixMensuel: 199,

    devise: "EUR",

    utilisateursMax: 50,

    stockageMax: 200,

    apiQuota: 100000,

    supportPremium: true,
  },

  {
    id: "enterprise",

    nom: "Enterprise",

    prixMensuel: 999,

    devise: "EUR",

    utilisateursMax: 9999,

    stockageMax: 9999,

    apiQuota: 9999999,

    supportPremium: true,
  },
];

export const BillingDashboard = () => {

  return (

    <div className="
      space-y-8
    ">

      <div>

        <h2 className="
          text-4xl
          font-bold
        ">
          SaaS Billing
        </h2>

        <p className="
          text-gray-500
          mt-2
        ">
          Gestion abonnements enterprise
        </p>

      </div>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      ">

        {plans.map(
          (plan) => (

            <PlanCard
              key={plan.id}
              plan={plan}
            />

          )
        )}

      </div>

    </div>
  );
}
'@

Set-Content `
"src\features\billing\components\BillingDashboard.tsx" `
$billingDashboard

# =====================================================
# USAGE TRACKER
# =====================================================

$usageTracker = @'
export const UsageTracker = {

  trackApiCall(
    organisationId: string
  ) {

    console.log(
      "Tracking API call",
      organisationId
    );
  },

  trackStorage(
    organisationId: string,
    size: number
  ) {

    console.log(
      "Tracking storage",
      organisationId,
      
      size
    );
  },
};
'@

Set-Content `
"src\features\billing\services\UsageTracker.ts" `
$usageTracker

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest SaaS Billing Platform generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- SaaS plans"
Write-Host "- Subscription engine"
Write-Host "- Billing dashboard"
Write-Host "- Usage tracking"
Write-Host "- Commercial SaaS foundation"
Write-Host ""