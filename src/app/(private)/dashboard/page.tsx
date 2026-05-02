"use client";

import {
  useDashboardStats
}
from "@/features/analytics/hooks/useDashboardStats";

import {
  DashboardBarChart
}
from "@/features/analytics/components/DashboardBarChart";

export default function DashboardPage() {

  const stats =
    useDashboardStats();

  return (

    <div className="p-10 space-y-8">

      <h1
        className="
          text-4xl
          font-bold
        "
      >
        Dashboard
      </h1>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-5
          gap-6
        "
      >

        <div
          className="
            bg-white
            rounded-2xl
            shadow-md
            p-6
          "
        >
          <p className="text-sm">
            Produits
          </p>

          <h2
            className="
              text-3xl
              font-bold
            "
          >
            {stats.produits}
          </h2>
        </div>

        <div
          className="
            bg-white
            rounded-2xl
            shadow-md
            p-6
          "
        >
          <p className="text-sm">
            Exploitations
          </p>

          <h2
            className="
              text-3xl
              font-bold
            "
          >
            {stats.exploitations}
          </h2>
        </div>

        <div
          className="
            bg-white
            rounded-2xl
            shadow-md
            p-6
          "
        >
          <p className="text-sm">
            Interventions
          </p>

          <h2
            className="
              text-3xl
              font-bold
            "
          >
            {stats.interventions}
          </h2>
        </div>

        <div
          className="
            bg-white
            rounded-2xl
            shadow-md
            p-6
          "
        >
          <p className="text-sm">
            Matériels
          </p>

          <h2
            className="
              text-3xl
              font-bold
            "
          >
            {stats.materiels}
          </h2>
        </div>

        <div
          className="
            bg-white
            rounded-2xl
            shadow-md
            p-6
          "
        >
          <p className="text-sm">
            Mouvements
          </p>

          <h2
            className="
              text-3xl
              font-bold
            "
          >
            {stats.mouvements}
          </h2>
        </div>

      </div>

      <DashboardBarChart

        data={[

          {
            name: "Produits",
            value: stats.produits,
          },

          {
            name: "Exploitations",
            value: stats.exploitations,
          },

          {
            name: "Interventions",
            value: stats.interventions,
          },

          {
            name: "Matériels",
            value: stats.materiels,
          },

          {
            name: "Mouvements",
            value: stats.mouvements,
          },
        ]}
      />

    </div>
  );
}