Write-Host "Generating Terragest SaaS Layout..." -ForegroundColor Cyan

# =====================================================
# COMPONENTS DIRECTORY
# =====================================================

New-Item -ItemType Directory -Force -Path "src\components\layout"

# =====================================================
# SIDEBAR COMPONENT
# =====================================================

$sidebar = @'
"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { AuthService } from "@/services/AuthService";

export const Sidebar = () => {

  const router = useRouter();

  const handleLogout = async () => {

    await AuthService.logout();

    router.push("/login");
  };

  return (

    <aside className="w-72 min-h-screen bg-black text-white flex flex-col">

      <div className="p-6 border-b border-gray-800">

        <h1 className="text-3xl font-bold">
          Terragest
        </h1>

        <p className="text-gray-400 text-sm mt-2">
          ERP patrimonial rural
        </p>

      </div>

      <nav className="flex-1 p-4 space-y-2">

        <Link
          href="/dashboard"
          className="block px-4 py-3 rounded-lg hover:bg-gray-900"
        >
          Dashboard
        </Link>

        <Link
          href="/terrains"
          className="block px-4 py-3 rounded-lg hover:bg-gray-900"
        >
          Terrains
        </Link>

        <Link
          href="/exploitations"
          className="block px-4 py-3 rounded-lg hover:bg-gray-900"
        >
          Exploitations
        </Link>

        <Link
          href="/ressources"
          className="block px-4 py-3 rounded-lg hover:bg-gray-900"
        >
          Ressources
        </Link>

        <Link
          href="/produits"
          className="block px-4 py-3 rounded-lg hover:bg-gray-900"
        >
          Produits
        </Link>

        <Link
          href="/mouvements"
          className="block px-4 py-3 rounded-lg hover:bg-gray-900"
        >
          Mouvements
        </Link>

      </nav>

      <div className="p-4 border-t border-gray-800">

        <button
          onClick={handleLogout}
          className="w-full bg-white text-black rounded-lg p-3"
        >
          Déconnexion
        </button>

      </div>

    </aside>
  );
}
'@

Set-Content `
"src\components\layout\Sidebar.tsx" `
$sidebar

# =====================================================
# APP LAYOUT
# =====================================================

$layout = @'
"use client";

import { Sidebar } from "@/components/layout/Sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <main className="flex-1">

        {children}

      </main>

    </div>
  );
}
'@

Set-Content `
"src\components\layout\AppLayout.tsx" `
$layout

# =====================================================
# UPDATE DASHBOARD
# =====================================================

$dashboard = @'
"use client";

import {
  useEffect,
  useState,
} from "react";

import { AppLayout } from "@/components/layout/AppLayout";

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

    <AppLayout>

      <div className="p-10 space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Vue globale ERP
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

      </div>

    </AppLayout>
  );
}
'@

Set-Content `
"src\app\dashboard\page.tsx" `
$dashboard

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest SaaS Layout generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Next:" -ForegroundColor Yellow
Write-Host "1. pnpm dev"
Write-Host "2. Open /dashboard"
Write-Host "3. Navigate ERP using sidebar"
Write-Host ""