# =========================================================
# TERRAGEST - CONNECT AUTH TO ERP SHELL
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " CONNECT AUTH SHELL"
Write-Host "========================================="
Write-Host ""

# =========================================================
# UPDATE LOGIN PAGE
# =========================================================

$loginPage = @'
// src/app/login/page.tsx

"use client";

import { useState }
from "react";

import { useRouter }
from "next/navigation";

import { AuthService }
from "@/platform/auth/AuthService";

export default function LoginPage() {

  const router =
    useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  function handleLogin() {

    const success =
      AuthService.login(

        email,

        password
      );

    if (success) {

      router.push("/");
    }
  }

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-zinc-100
      "
    >

      <div
        className="
          w-full
          max-w-md
          bg-white
          rounded-2xl
          shadow-sm
          p-8
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            mb-6
          "
        >
          Connexion ERP
        </h1>

        <div
          className="
            flex
            flex-col
            gap-4
          "
        >

          <input

            type="email"

            placeholder="Email"

            value={email}

            onChange={event =>
              setEmail(
                event.target.value
              )
            }

            className="
              border
              rounded-xl
              px-4
              py-3
            "
          />

          <input

            type="password"

            placeholder="Mot de passe"

            value={password}

            onChange={event =>
              setPassword(
                event.target.value
              )
            }

            className="
              border
              rounded-xl
              px-4
              py-3
            "
          />

          <button

            onClick={
              handleLogin
            }

            className="
              bg-black
              text-white
              rounded-xl
              py-3
              font-medium
            "
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
}
'@

Set-Content `
  ".\src\app\login\page.tsx" `
  $loginPage

Write-Host ""
Write-Host "[UPDATED] Login page"

# =========================================================
# UPDATE HOME PAGE
# =========================================================

$homePage = @'
// src/app/page.tsx

"use client";

import { useRouter }
from "next/navigation";

import { useEffect }
from "react";

import { ERPLayout }
from "@/components/layout/ERPLayout";

import { AuthGuard }
from "@/platform/auth/guards/AuthGuard";

export default function HomePage() {

  const router =
    useRouter();

  useEffect(() => {

    const allowed =
      AuthGuard.check();

    if (!allowed) {

      router.push(
        "/login"
      );
    }

  }, [router]);

  return (

    <ERPLayout>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >

        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            p-6
          "
        >
          Stocks
        </div>

        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            p-6
          "
        >
          Maintenance
        </div>

        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            p-6
          "
        >
          Paiements
        </div>

        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            p-6
          "
        >
          Workflows
        </div>

      </div>

    </ERPLayout>
  );
}
'@

Set-Content `
  ".\src\app\page.tsx" `
  $homePage

Write-Host "[UPDATED] Home page"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " AUTH CONNECTED TO SHELL"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\connect-auth-shell.ps1"
Write-Host "pnpm build"
Write-Host ""