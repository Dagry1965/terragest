Write-Host "Generating Terragest KPI Dashboard..." -ForegroundColor Cyan

# =====================================================
# DASHBOARD PAGE
# =====================================================

$dashboardPage = @'
"use client";

import {
  useEffect,
  useState,
} from "react";

import { useAuth } from "@/providers/AuthProvider";

import { UtilisateurService } from "@/services/UtilisateurService";

import { RessourceService } from "@/features/ressources/services/RessourceService";

import { ProduitService } from "@/features/produits/services/ProduitService";

import { MouvementService } from "@/features/mouvements/services/MouvementService";

export default function DashboardPage() {

  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  const [totalRessources, setTotalRessources] = useState(0);

  const [totalProduits, setTotalProduits] = useState(0);

  const [totalMouvements, setTotalMouvements] = useState(0);

  const [depenses, setDepenses] = useState(0);

  const [revenus, setRevenus] = useState(0);

  const [stockFaible, setStockFaible] = useState(0);

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

      const ressources =
        await RessourceService.getAllByOrganisation(
          organisationId
        );

      const produits =
        await ProduitService.getAllByOrganisation(
          organisationId
        );

      const mouvements =
        await MouvementService.getAllByOrganisation(
          organisationId
        );

      setTotalRessources(
        ressources.length
      );

      setTotalProduits(
        produits.length
      );

      setTotalMouvements(
        mouvements.length
      );

      const totalDepenses =
        mouvements
          .filter(
            (m: any) =>
              m.sens === "SORTIE"
          )
          .reduce(
            (sum: number, m: any) =>
              sum + m.montant,
            0
          );

      const totalRevenus =
        mouvements
          .filter(
            (m: any) =>
              m.sens === "ENTREE"
          )
          .reduce(
            (sum: number, m: any) =>
              sum + m.montant,
            0
          );

      setDepenses(totalDepenses);

      setRevenus(totalRevenus);

      const alertes =
        [
          ...ressources,
          ...produits,
        ].filter(
          (item: any) =>
            item.stockActuel <=
            item.seuilAlerte
        );

      setStockFaible(alertes.length);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {

    return (
      <main className="p-10">
        Chargement dashboard...
      </main>
    );
  }

  return (

    <main className="min-h-screen bg-gray-100 p-10 space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Terragest Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          ERP patrimonial rural intelligent
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-gray-500">
            Ressources
          </h2>

          <p className="text-4xl font-bold mt-2">
            {totalRessources}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-gray-500">
            Produits
          </h2>

          <p className="text-4xl font-bold mt-2">
            {totalProduits}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-gray-500">
            Mouvements
          </h2>

          <p className="text-4xl font-bold mt-2">
            {totalMouvements}
          </p>

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-gray-500">
            Dépenses
          </h2>

          <p className="text-4xl font-bold mt-2">
            {depenses}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-gray-500">
            Revenus
          </h2>

          <p className="text-4xl font-bold mt-2">
            {revenus}
          </p>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-gray-500">
          Alertes stock faible
        </h2>

        <p className="text-4xl font-bold mt-2">
          {stockFaible}
        </p>

      </div>

    </main>
  );
}
'@

Set-Content `
"src\app\dashboard\page.tsx" `
$dashboardPage

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest KPI Dashboard generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Next:" -ForegroundColor Yellow
Write-Host "1. pnpm dev"
Write-Host "2. Open /dashboard"
Write-Host "3. Create data"
Write-Host "4. Watch KPIs evolve"
Write-Host ""