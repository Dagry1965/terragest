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
