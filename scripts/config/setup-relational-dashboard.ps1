Write-Host "Generating Terragest Relational Dashboard..." -ForegroundColor Cyan

# =====================================================
# DASHBOARD PAGE
# =====================================================

$dashboardPage = @'
"use client";

import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import { Card } from "@/components/ui/Card";

import { useAuth } from "@/providers/AuthProvider";

import { UtilisateurService } from "@/services/UtilisateurService";

import { TerrainService } from "@/features/terrains/services/TerrainService";

import { ExploitationService } from "@/features/exploitations/services/ExploitationService";

import { ProduitService } from "@/features/produits/services/ProduitService";

import { RessourceService } from "@/features/ressources/services/RessourceService";

import { MouvementService } from "@/features/mouvements/services/MouvementService";

export default function DashboardPage() {

  const { user } = useAuth();

  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] =
    useState({

      terrains: 0,

      exploitations: 0,

      produits: 0,

      ressources: 0,

      mouvements: 0,

      stockFaible: 0,
    });

  const [topExploitations,
    setTopExploitations] =
    useState<any[]>([]);

  useEffect(() => {

    if (user) {
      loadDashboard();
    }

  }, [user]);

  const loadDashboard = async () => {

    try {

      if (!user) {
        return;
      }

      const utilisateur =
        await UtilisateurService.getById(
          user.uid
        );

      if (!utilisateur) {
        return;
      }

      const organisationId =
        utilisateur.organisationId;

      const [
        terrains,
        exploitations,
        produits,
        ressources,
        mouvements,
      ] = await Promise.all([

        TerrainService.getAllByOrganisation(
          organisationId
        ),

        ExploitationService.getAllByOrganisation(
          organisationId
        ),

        ProduitService.getAllByOrganisation(
          organisationId
        ),

        RessourceService.getAllByOrganisation(
          organisationId
        ),

        MouvementService.getAllByOrganisation(
          organisationId
        ),
      ]);

      const stockFaible =
        produits.filter(
          (item: any) =>
            item.stockActuel <=
            item.seuilAlerte
        ).length;

      const exploitationMap:
        Record<string, number> = {};

      terrains.forEach(
        (terrain: any) => {

          const nom =
            terrain.exploitationNom ||
            "Non affecté";

          exploitationMap[nom] =
            (exploitationMap[nom] || 0) + 1;
        }
      );

      const topData =
        Object.entries(exploitationMap)
          .map(([nom, total]) => ({
            nom,
            total,
          }))
          .sort(
            (a, b) =>
              b.total - a.total
          );

      setTopExploitations(
        topData
      );

      setStats({

        terrains:
          terrains.length,

        exploitations:
          exploitations.length,

        produits:
          produits.length,

        ressources:
          ressources.length,

        mouvements:
          mouvements.length,

        stockFaible,
      });

    } catch (err) {

      console.error(err);

      toast.error(
        "Erreur dashboard"
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

      <div>

        <h1 className="text-4xl font-bold">
          Dashboard ERP
        </h1>

        <p className="text-gray-500 mt-2">
          Vue globale patrimoniale
        </p>

      </div>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      ">

        <Card>

          <p className="text-gray-500">
            Terrains
          </p>

          <h2 className="text-4xl font-bold mt-4">
            {stats.terrains}
          </h2>

        </Card>

        <Card>

          <p className="text-gray-500">
            Exploitations
          </p>

          <h2 className="text-4xl font-bold mt-4">
            {stats.exploitations}
          </h2>

        </Card>

        <Card>

          <p className="text-gray-500">
            Produits
          </p>

          <h2 className="text-4xl font-bold mt-4">
            {stats.produits}
          </h2>

        </Card>

        <Card>

          <p className="text-gray-500">
            Ressources
          </p>

          <h2 className="text-4xl font-bold mt-4">
            {stats.ressources}
          </h2>

        </Card>

        <Card>

          <p className="text-gray-500">
            Mouvements
          </p>

          <h2 className="text-4xl font-bold mt-4">
            {stats.mouvements}
          </h2>

        </Card>

        <Card>

          <p className="text-gray-500">
            Stock faible
          </p>

          <h2 className="text-4xl font-bold mt-4 text-red-600">
            {stats.stockFaible}
          </h2>

        </Card>

      </div>

      <div className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-6
      ">

        <Card>

          <h2 className="text-2xl font-bold">
            Terrains par exploitation
          </h2>

          <div className="mt-6 space-y-4">

            {topExploitations.map(
              (item) => (

                <div
                  key={item.nom}
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    pb-3
                  "
                >

                  <p className="font-medium">
                    {item.nom}
                  </p>

                  <p className="
                    text-xl
                    font-bold
                  ">
                    {item.total}
                  </p>

                </div>

              )
            )}

          </div>

        </Card>

        <Card>

          <h2 className="text-2xl font-bold">
            Vue ERP
          </h2>

          <div className="mt-6 space-y-4">

            <div className="
              flex
              items-center
              justify-between
            ">

              <p>
                Patrimoine terrain
              </p>

              <p className="font-bold">
                {stats.terrains}
              </p>

            </div>

            <div className="
              flex
              items-center
              justify-between
            ">

              <p>
                Patrimoine exploitation
              </p>

              <p className="font-bold">
                {stats.exploitations}
              </p>

            </div>

            <div className="
              flex
              items-center
              justify-between
            ">

              <p>
                Flux stock
              </p>

              <p className="font-bold">
                {stats.mouvements}
              </p>

            </div>

          </div>

        </Card>

      </div>

    </div>
  );
}
'@

Set-Content `
"src\app\(private)\dashboard\page.tsx" `
$dashboardPage

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Relational Dashboard generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- KPI dashboard"
Write-Host "- Relational stats"
Write-Host "- Exploitation analytics"
Write-Host "- Stock analytics"
Write-Host "- ERP global view"
Write-Host ""