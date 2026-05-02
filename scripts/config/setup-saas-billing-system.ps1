Write-Host "Generating Terragest SaaS Billing System..." -ForegroundColor Cyan

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\features\billing" -Force
mkdir "src\features\billing\types" -Force
mkdir "src\features\billing\services" -Force
mkdir "src\features\billing\components" -Force

# =====================================================
# SUBSCRIPTION PLAN ENUM
# =====================================================

$subscriptionPlan = @'
export enum SubscriptionPlan {

  STARTER = "STARTER",

  PRO = "PRO",

  ENTERPRISE = "ENTERPRISE",
}
'@

Set-Content `
"src\features\billing\types\SubscriptionPlan.ts" `
$subscriptionPlan

# =====================================================
# BILLING SUBSCRIPTION TYPE
# =====================================================

$subscriptionType = @'
import { SubscriptionPlan } from "@/features/billing/types/SubscriptionPlan";

export interface BillingSubscription {

  id: string;

  organisationId: string;

  plan: SubscriptionPlan;

  actif: boolean;

  utilisateursMax: number;

  exploitationsMax: number;

  terrainsMax: number;

  expirationDate?: string;

  createdAt: string;
}
'@

Set-Content `
"src\features\billing\types\BillingSubscription.ts" `
$subscriptionType

# =====================================================
# FEATURE FLAGS
# =====================================================

$featureFlags = @'
import { SubscriptionPlan } from "@/features/billing/types/SubscriptionPlan";

export const FeatureFlags = {

  EXPORTS: [
    SubscriptionPlan.PRO,
    SubscriptionPlan.ENTERPRISE,
  ],

  ANALYTICS: [
    SubscriptionPlan.PRO,
    SubscriptionPlan.ENTERPRISE,
  ],

  REALTIME: [
    SubscriptionPlan.ENTERPRISE,
  ],

  MULTI_ORGANISATION: [
    SubscriptionPlan.ENTERPRISE,
  ],

  WORKFLOW: [
    SubscriptionPlan.PRO,
    SubscriptionPlan.ENTERPRISE,
  ],
};
'@

Set-Content `
"src\features\billing\types\FeatureFlags.ts" `
$featureFlags

# =====================================================
# BILLING SERVICE
# =====================================================

$billingService = @'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
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

  async getSubscription(
    organisationId: string
  ) {

    const ref =
      doc(
        db,
        "subscriptions",
        organisationId
      );

    const snapshot =
      await getDoc(ref);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  },

  async updateSubscription(
    organisationId: string,
    data: any
  ) {

    return updateDoc(
      doc(
        db,
        "subscriptions",
        organisationId
      ),
      data
    );
  },
};
'@

Set-Content `
"src\features\billing\services\BillingService.ts" `
$billingService

# =====================================================
# FEATURE ACCESS HELPER
# =====================================================

$featureAccess = @'
import { FeatureFlags } from "@/features/billing/types/FeatureFlags";

export const hasFeatureAccess = (
  plan: string | undefined,
  feature:
    keyof typeof FeatureFlags
) => {

  if (!plan) {
    return false;
  }

  return FeatureFlags[
    feature
  ].includes(plan as any);
}
'@

Set-Content `
"src\features\billing\services\hasFeatureAccess.ts" `
$featureAccess

# =====================================================
# SUBSCRIPTION BADGE
# =====================================================

$subscriptionBadge = @'
interface SubscriptionBadgeProps {

  plan: string;
}

export const SubscriptionBadge = ({
  plan,
}: SubscriptionBadgeProps) => {

  const getClassName = () => {

    switch (plan) {

      case "STARTER":
        return "bg-gray-200 text-gray-700";

      case "PRO":
        return "bg-blue-100 text-blue-700";

      case "ENTERPRISE":
        return "bg-black text-white";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (

    <div
      className={`
        inline-flex
        items-center
        px-4
        py-2
        rounded-full
        text-sm
        font-bold
        ${getClassName()}
      `}
    >
      {plan}
    </div>
  );
}
'@

Set-Content `
"src\features\billing\components\SubscriptionBadge.tsx" `
$subscriptionBadge

# =====================================================
# FEATURE GUARD
# =====================================================

$featureGuard = @'
"use client";

import { ReactNode } from "react";

import { hasFeatureAccess } from "@/features/billing/services/hasFeatureAccess";

interface FeatureGuardProps {

  plan?: string;

  feature: any;

  children: ReactNode;
}

export const FeatureGuard = ({
  plan,
  feature,
  children,
}: FeatureGuardProps) => {

  const allowed =
    hasFeatureAccess(
      plan,
      feature
    );

  if (!allowed) {

    return (

      <div className="
        p-6
        rounded-2xl
        border
        border-yellow-300
        bg-yellow-50
        text-yellow-700
      ">

        Fonctionnalité disponible
        uniquement avec un plan
        supérieur.

      </div>
    );
  }

  return <>{children}</>;
}
'@

Set-Content `
"src\features\billing\components\FeatureGuard.tsx" `
$featureGuard

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest SaaS Billing System generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- Subscription plans"
Write-Host "- Billing service"
Write-Host "- Feature flags"
Write-Host "- FeatureGuard"
Write-Host "- SaaS monetization foundation"
Write-Host ""