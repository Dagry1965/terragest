Write-Host "Generating Terragest Login Page..." -ForegroundColor Cyan

# =====================================================
# LOGIN DIRECTORY
# =====================================================

New-Item -ItemType Directory -Force -Path "src\app\login"

# =====================================================
# LOGIN PAGE
# =====================================================

$loginPage = @'
"use client";

import { useState } from "react";

import { AuthService } from "@/services/AuthService";

export default function LoginPage() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleLogin = async () => {

    try {

      setLoading(true);

      setError("");

      await AuthService.login(
        email,
        password
      );

      alert("Connexion réussie");

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
Write-Host "Terragest Login Page created successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Next:" -ForegroundColor Yellow
Write-Host "1. pnpm dev"
Write-Host "2. Open http://localhost:3000/login"
Write-Host ""