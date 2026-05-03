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