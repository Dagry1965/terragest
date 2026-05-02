# =====================================================
# TERRAGEST
# REAL KPI DASHBOARD
# =====================================================

Set-Location `
"C:\Users\Admin\terragest"

# =====================================================
# ANALYTICS SERVICE
# =====================================================

New-Item `
-ItemType Directory `
-Force `
-Path `
"src\features\analytics\services"

$service = @'
import {

  getDocs,

  collection

} from "firebase/firestore";

import {

  db

} from "@/lib/firebase/firebase";

export const
DashboardAnalyticsService = {

  async getStats() {

    const [

      produits,

      exploitations,

      stocks,

      materiels

    ] = await Promise.all([

      getDocs(
        collection(
          db,
          "produits"
        )
      ),

      getDocs(
        collection(
          db,
          "exploitations"
        )
      ),

      getDocs(
        collection(
          db,
          "mouvements_stock"
        )
      ),

      getDocs(
        collection(
          db,
          "materiels"
        )
      ),
    ]);

    return {

      produits:
        produits.size,

      exploitations:
        exploitations.size,

      stocks:
        stocks.size,

      materiels:
        materiels.size,
    };
  },
};
'@

Set-Content `
-Path `
"src\features\analytics\services\DashboardAnalyticsService.ts" `
-Value $service

# =====================================================
# DASHBOARD PAGE
# =====================================================

$dashboard = @'
"use client";

import {

  useEffect,

  useState

} from "react";

import {

  DashboardAnalyticsService

} from "@/features/analytics/services/DashboardAnalyticsService";

export default function DashboardPage() {

  const [

    stats,

    setStats

  ] = useState<any>(null);

  useEffect(() => {

    load();

  }, []);

  const load =
    async () => {

      const data =

        await DashboardAnalyticsService
          .getStats();

      setStats(data);
    };

  if (!stats) {

    return (

      <div className="p-10">

        Chargement...

      </div>
    );
  }

  return (

    <div className="p-10">

      <h1
        className="
          text-4xl
          font-bold
          mb-8
        "
      >
        Dashboard KPI
      </h1>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
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

          <p>
            Produits
          </p>

          <h2
            className="
              text-4xl
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

          <p>
            Exploitations
          </p>

          <h2
            className="
              text-4xl
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

          <p>
            Stocks
          </p>

          <h2
            className="
              text-4xl
              font-bold
            "
          >
            {stats.stocks}
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

          <p>
            Matériels
          </p>

          <h2
            className="
              text-4xl
              font-bold
            "
          >
            {stats.materiels}
          </h2>

        </div>

      </div>

    </div>
  );
}
'@

Set-Content `
-Path `
"src\app\(private)\dashboard\page.tsx" `
-Value $dashboard

# =====================================================
# BUILD
# =====================================================

Write-Host ""
Write-Host "Running build..." `
-ForegroundColor Cyan

pnpm build

Write-Host ""
Write-Host "Deploy after success:" `
-ForegroundColor Green

Write-Host "firebase deploy"