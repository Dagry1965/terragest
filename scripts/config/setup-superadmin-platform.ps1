Write-Host "Generating Terragest Super Admin Platform..." -ForegroundColor Cyan

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\app\(superadmin)" -Force
mkdir "src\app\(superadmin)\admin" -Force

mkdir "src\features\superadmin" -Force
mkdir "src\features\superadmin\components" -Force
mkdir "src\features\superadmin\services" -Force

# =====================================================
# SUPER ADMIN STATS SERVICE
# =====================================================

$statsService = @'
import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

export const SuperAdminService = {

  async getPlatformStats() {

    const [
      organisations,
      utilisateurs,
      subscriptions,
      produits,
    ] = await Promise.all([

      getDocs(
        collection(
          db,
          "organisations"
        )
      ),

      getDocs(
        collection(
          db,
          "utilisateurs"
        )
      ),

      getDocs(
        collection(
          db,
          "subscriptions"
        )
      ),

      getDocs(
        collection(
          db,
          "produits"
        )
      ),
    ]);

    return {

      organisations:
        organisations.size,

      utilisateurs:
        utilisateurs.size,

      subscriptions:
        subscriptions.size,

      produits:
        produits.size,
    };
  },
};
'@

Set-Content `
"src\features\superadmin\services\SuperAdminService.ts" `
$statsService

# =====================================================
# PLATFORM KPI CARD
# =====================================================

$platformKpi = @'
interface PlatformKpiCardProps {

  title: string;

  value: number;
}

export const PlatformKpiCard = ({
  title,
  value,
}: PlatformKpiCardProps) => {

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-md
      p-6
    ">

      <p className="text-gray-500">
        {title}
      </p>

      <h2 className="
        text-4xl
        font-bold
        mt-4
      ">
        {value}
      </h2>

    </div>
  );
}
'@

Set-Content `
"src\features\superadmin\components\PlatformKpiCard.tsx" `
$platformKpi

# =====================================================
# ORGANISATIONS TABLE
# =====================================================

$organisationsTable = @'
interface OrganisationsTableProps {

  organisations: any[];
}

export const OrganisationsTable = ({
  organisations,
}: OrganisationsTableProps) => {

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-md
      p-6
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-6
      ">
        Organisations
      </h2>

      <div className="space-y-4">

        {organisations.map(
          (organisation) => (

            <div
              key={organisation.id}
              className="
                flex
                items-center
                justify-between
                border-b
                pb-3
              "
            >

              <div>

                <p className="font-bold">
                  {organisation.nom}
                </p>

                <p className="
                  text-sm
                  text-gray-500
                ">
                  {organisation.code}
                </p>

              </div>

              <div>

                {organisation.actif
                  ? (

                    <span className="
                      px-3
                      py-1
                      rounded-full
                      bg-green-100
                      text-green-700
                      text-sm
                      font-bold
                    ">
                      ACTIF
                    </span>

                  )

                  : (

                    <span className="
                      px-3
                      py-1
                      rounded-full
                      bg-red-100
                      text-red-700
                      text-sm
                      font-bold
                    ">
                      SUSPENDU
                    </span>

                  )}
              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
}
'@

Set-Content `
"src\features\superadmin\components\OrganisationsTable.tsx" `
$organisationsTable

# =====================================================
# SUPER ADMIN DASHBOARD PAGE
# =====================================================

$superAdminDashboard = @'
"use client";

import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import { SuperAdminBadge } from "@/features/organisations/components/SuperAdminBadge";

import { PlatformKpiCard } from "@/features/superadmin/components/PlatformKpiCard";

import { OrganisationsTable } from "@/features/superadmin/components/OrganisationsTable";

import { OrganisationService } from "@/features/organisations/services/OrganisationService";

import { SuperAdminService } from "@/features/superadmin/services/SuperAdminService";

export default function SuperAdminPage() {

  const [stats, setStats] =
    useState<any>(null);

  const [organisations,
    setOrganisations] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      const [
        statsData,
        organisationsData,
      ] = await Promise.all([

        SuperAdminService.getPlatformStats(),

        OrganisationService.getAll(),
      ]);

      setStats(statsData);

      setOrganisations(
        organisationsData
      );

    } catch (err) {

      console.error(err);

      toast.error(
        "Erreur chargement"
      );

    } finally {

      setLoading(false);

    }
  };

  if (loading) {

    return (
      <main className="p-10">
        Chargement...
      </main>
    );
  }

  return (

    <div className="p-10 space-y-10">

      <div className="
        flex
        items-center
        justify-between
      ">

        <div>

          <h1 className="
            text-4xl
            font-bold
          ">
            SaaS Admin Platform
          </h1>

          <p className="
            text-gray-500
            mt-2
          ">
            Supervision plateforme
          </p>

        </div>

        <SuperAdminBadge />

      </div>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
      ">

        <PlatformKpiCard
          title="Organisations"
          value={
            stats.organisations
          }
        />

        <PlatformKpiCard
          title="Utilisateurs"
          value={
            stats.utilisateurs
          }
        />

        <PlatformKpiCard
          title="Abonnements"
          value={
            stats.subscriptions
          }
        />

        <PlatformKpiCard
          title="Produits"
          value={
            stats.produits
          }
        />

      </div>

      <OrganisationsTable
        organisations={
          organisations
        }
      />

    </div>
  );
}
'@

Set-Content `
"src\app\(superadmin)\admin\page.tsx" `
$superAdminDashboard

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Super Admin Platform generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- Super admin dashboard"
Write-Host "- Platform KPIs"
Write-Host "- Organisations management"
Write-Host "- SaaS supervision"
Write-Host "- Enterprise SaaS foundation"
Write-Host ""