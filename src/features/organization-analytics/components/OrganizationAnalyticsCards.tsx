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