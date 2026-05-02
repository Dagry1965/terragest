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
