$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"

function Write-Utf8NoBom {
  param(
    [string]$Path,
    [string]$Content
  )

  $dir = Split-Path $Path -Parent

  if (!(Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
  }

  [System.IO.File]::WriteAllText(
    $Path,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host "WRITTEN $Path"
}

$loginPath = Join-Path `
  $root `
  "src\app\login\page.tsx"

$loginContent = @'
"use client";

import { useState }
from "react";

import { useRouter }
from "next/navigation";

import {
  signInWithEmailAndPassword,
}
from "firebase/auth";

import {
  auth,
}
from "@/lib/firebase/config";

export default function LoginPage() {

  const router =
    useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleLogin() {

    try {

      setLoading(true);

      setError("");

      await signInWithEmailAndPassword(

        auth,

        email,

        password
      );

      document.cookie =
        "token=authenticated; path=/; max-age=86400; SameSite=Lax";

      router.push(
        "/dashboard"
      );

    } catch (err: any) {

      console.error(err);

      setError(
        "Email ou mot de passe invalide."
      );

    } finally {

      setLoading(false);
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

          {error ? (

            <div
              className="
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-sm
                text-red-700
              "
            >
              {error}
            </div>

          ) : null}

          <button

            onClick={
              handleLogin
            }

            disabled={loading}

            className="
              bg-black
              text-white
              rounded-xl
              py-3
              font-medium
              disabled:opacity-50
            "
          >
            {loading
              ? "Connexion..."
              : "Se connecter"}
          </button>

        </div>

      </div>

    </div>
  );
}
'@

Write-Utf8NoBom `
  -Path $loginPath `
  -Content $loginContent

Write-Host ""
Write-Host "OK - Login upgraded to Firebase Auth."
Write-Host "Run: pnpm build"
