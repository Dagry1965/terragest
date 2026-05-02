Write-Host "Generating Terragest Dashboard..." -ForegroundColor Cyan

# =====================================================
# DASHBOARD DIRECTORY
# =====================================================

New-Item -ItemType Directory -Force -Path "src\app\dashboard"

# =====================================================
# DASHBOARD PAGE
# =====================================================

$dashboardPage = @'
"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/providers/AuthProvider";

import { AuthService } from "@/services/AuthService";

export default function DashboardPage() {

  const router = useRouter();

  const { user, loading } = useAuth();

  useEffect(() => {

    if (!loading && !user) {
      router.push("/login");
    }

  }, [user, loading, router]);

  const handleLogout = async () => {

    await AuthService.logout();

    router.push("/login");
  };

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

    <main className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              Terragest Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Connecté : {user.email}
            </p>

          </div>

          <button
            onClick={handleLogout}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Déconnexion
          </button>

        </div>

      </div>

    </main>
  );
}
'@

Set-Content "src\app\dashboard\page.tsx" $dashboardPage

# =====================================================
# UPDATE LOGIN PAGE
# =====================================================

$loginPage = @'
"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { AuthService } from "@/services/AuthService";

import { useAuth } from "@/providers/AuthProvider";

export default function LoginPage() {

  const router = useRouter();

  const { user } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {

    if (user) {
      router.push("/dashboard");
    }

  }, [user, router]);

  const handleLogin = async () => {

    try {

      setLoading(true);

      setError("");

      await AuthService.login(
        email,
        password
      );

      router.push("/dashboard");

    } catch (err) {

      console.error(err);

      setError(
        "Email ou mot de passe incorrect"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <main className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 space-y-4">

        <h1 className="text-2xl font-bold text-center">
          Terragest
        </h1>

        <p className="text-center text-gray-500">
          Connexion ERP
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full border rounded-lg p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-black text-white rounded-lg p-3"
        >
          {loading
            ? "Connexion..."
            : "Se connecter"}
        </button>

      </div>

    </main>
  );
}
'@

Set-Content "src\app\login\page.tsx" $loginPage

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Dashboard generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Next:" -ForegroundColor Yellow
Write-Host "1. pnpm dev"
Write-Host "2. Login"
Write-Host "3. Automatic redirect to /dashboard"
Write-Host ""