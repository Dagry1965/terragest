Write-Host "Generating Terragest Private App Structure..." -ForegroundColor Cyan

# =====================================================
# PRIVATE APP DIRECTORY
# =====================================================

New-Item -ItemType Directory -Force -Path "src\app\(private)"

# =====================================================
# PRIVATE LAYOUT
# =====================================================

$privateLayout = @'
"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import AppLayout from "@/components/layout/AppLayout";

import { useAuth } from "@/providers/AuthProvider";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { user, loading } = useAuth();

  const router = useRouter();

  useEffect(() => {

    if (!loading && !user) {

      router.push("/login");

    }

  }, [user, loading, router]);

  if (loading) {

    return (

      <main className="p-10">
        Chargement...
      </main>

    );
  }

  if (!user) {
    return null;
  }

  return (

    <AppLayout>

      {children}

    </AppLayout>
  );
}
'@

Set-Content `
"src\app\(private)\layout.tsx" `
$privateLayout

# =====================================================
# MOVE DASHBOARD
# =====================================================

Move-Item `
"src\app\dashboard" `
"src\app\(private)\dashboard" `
-Force

# =====================================================
# MOVE TERRAINS
# =====================================================

Move-Item `
"src\app\terrains" `
"src\app\(private)\terrains" `
-Force

# =====================================================
# MOVE EXPLOITATIONS
# =====================================================

Move-Item `
"src\app\exploitations" `
"src\app\(private)\exploitations" `
-Force

# =====================================================
# MOVE RESSOURCES
# =====================================================

Move-Item `
"src\app\ressources" `
"src\app\(private)\ressources" `
-Force

# =====================================================
# MOVE PRODUITS
# =====================================================

Move-Item `
"src\app\produits" `
"src\app\(private)\produits" `
-Force

# =====================================================
# MOVE MOUVEMENTS
# =====================================================

Move-Item `
"src\app\mouvements" `
"src\app\(private)\mouvements" `
-Force

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Private App Structure generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Protected routes:" -ForegroundColor Yellow
Write-Host "- /dashboard"
Write-Host "- /terrains"
Write-Host "- /exploitations"
Write-Host "- /ressources"
Write-Host "- /produits"
Write-Host "- /mouvements"
Write-Host ""
Write-Host "AppLayout now centralized."
Write-Host ""